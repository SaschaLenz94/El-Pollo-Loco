class World {
  character = new Character();
  endboss = this.endbossLink();

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossStatusbar = new BossStatusBar();
  throwableObject = [];
  isThrowLocked = false;
  bossLife = 100;
  throwBottleSound = new Audio("audio/throw.mp3");
  bottleBreak = new Audio("audio/bottleBreak.mp3");
  farmedSalsaSound = new Audio("audio/pickupsalsa.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.throwDistance = false;
    this.draw();
    this.setWorld();
    this.chickenCollision();
    this.run();
    this.throwBottleSound.pause();
    this.bottleBreak.pause();
    this.farmedSalsaSound.pause();
    this.throwBottleSound.volume = 0.3;
    this.bottleBreak.volume = 0.3;
    this.farmedSalsaSound.volume = 0.3;
    this.bottleBreak.playbackRate = 1.5;
  }

  drawBars() {}
  /**
   * load objects in canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.boss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsa);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.bossStatusbar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   *
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * linked the endboss
   * @returns for link the endboss
   */
  endbossLink() {
    for (const enemy of level1.boss) {
      if (enemy instanceof Endboss) {
        return enemy;
      }
    }
  }

  /**
   * check a collision between character and the top of chickens
   */
  chickenCollision() {
    setInterval(() => {
      this.checkChickenTopCollision();
    }, 16);
  }

  /**
   * checked collisions
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollisions();
      this.checkSalsaCollisions();
      this.checkThrowObjects();
      this.checkDistanceToEndboss();
      this.checkCollisionEndboss();
    }, 100);
  }

  /**
   * check the distance between the character and the endboss.
   */
  checkDistanceToEndboss() {
    if (this.character.x + 360 > this.endboss.x) {
      this.throwDistance = true;
      this.endboss.smallDistance = true;
    } else {
      this.endboss.smallDistance = false;
      this.throwDistance = false;
    }
  }
  /**
   * check if enogh famed salsa for throw a Salsa Bottle
   */
  checkThrowObjects() {
    if (!this.isThrowLocked && this.keyboard.D && this.character.farmedSalsa > 0) {
      if (!soundOff) {
        this.throwBottleSound.play();
      }
      let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 120);
      this.throwableObject.push(bottle);
      this.checkCollisionsBottleAndChicken();
      this.checkBottleOnGround();
      this.checkCollisionsBottleAndEndboss();
      this.character.farmedSalsa -= 20;
      this.bottleBar.setPercentage(this.character.farmedSalsa);
      this.isThrowLocked = true;
      setTimeout(() => {
        this.isThrowLocked = false;
      }, 1500);
    }
  }

  /**
   * check collision between character and left side from chicken
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.dead) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * check if a collision with a coin, coin counter ++
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coins, coinNumber) => {
      if (this.character.isColliding(coins) && this.character.farmedCoins < 100) {
        this.character.coinCounter();
        this.level.coins.splice(coinNumber, 1);
        this.coinBar.setPercentage(this.character.farmedCoins);
      }
    });
  }

  /**
   * check if a collision with a salsa, salsa counter ++
   */
  checkSalsaCollisions() {
    this.level.salsa.forEach((salsa, salsaNumber) => {
      if (
        this.character.isColliding(salsa) &&
        this.character.farmedSalsa < 100 &&
        this.character.farmedSalsa < 100
      ) {
        this.character.salsaCounter();
        if (!soundOff) {
          this.farmedSalsaSound.play();
        }
        this.level.salsa.splice(salsaNumber, 1);
        this.bottleBar.setPercentage(this.character.farmedSalsa);
      }
    });
  }

  /**
   * check if character have a collision with endboss
   */
  checkCollisionEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.energy = 0;
    }
  }

  /**
   * if collision with chicken top the chicken deleted
   */
  checkChickenTopCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isCollidingTOP(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          enemy.playDeathSound();
          enemy.dead = true;
          this.character.speedY = 15;
          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 100);
        }
      }
    });
  }

  /**
   * Checks collisions between throwable objects and the endboss.
   */
  checkCollisionsBottleAndEndboss() {
    setInterval(() => {
      this.throwableObject.forEach((bottle) => {
        if (this.endboss.isColliding(bottle)) {
          if (!this.endboss.hurting) {
            bottle.splash = true;
            if (!soundOff) {
              this.bottleBreak.play();
            }
            this.endbossHit();
            this.endboss.bossHurt = true;
            this.bossStatusbar.setPercentage(this.endboss.bossLife);
            this.endboss.hurting = true;
            setTimeout(() => {
              this.endboss.hurting = false;
            }, 1000);
          }
        }
      });
    }, 100);
  }

  /**
   * after collision between bottle and chicken, edit the pictures and delete it
   */
  checkCollisionsBottleAndChicken() {
    setInterval(() => {
      this.throwableObject.forEach((throwableObject) => {
        this.level.enemies.forEach((enemy, index) => {
          if (throwableObject.isColliding(enemy)) {
            enemy.dead = true;
            if (!soundOff) {
              enemy.playDeathSound();
            }
            throwableObject.speedY = 0;
            throwableObject.splash = true;
            clearInterval(throwableObject.trowXIntervall);
            setTimeout(() => {
              this.removebottle();
              this.level.enemies.splice(index, 1);
            }, 100);
          }
        });
      });
    }, 16);
  }

  /**
   * if the bottle touched the ground splash and delete the bottle.
   */
  checkBottleOnGround() {
    setInterval(() => {
      this.throwableObject.forEach((bottle) => {
        if (bottle.y >= 360) {
          clearInterval(bottle.trowXIntervall);
          bottle.speedY = 0;
          bottle.y = 360;
          bottle.splash = true;
          setTimeout(() => {
            this.removebottle();
          }, 100);
        }
      });
    }, 16);
  }

  /**
   * when the bottle hit the salsa, remove the salsa and give the boss damage.
   */
  endbossHit() {
    setTimeout(() => {
      this.removebottle();
    }, 50);
    this.endboss.endbossDamage();
  }

  /**
   * remove the bottle
   */
  removebottle() {
    if (!soundOff) {
      this.bottleBreak.play();
    }
    this.throwableObject.splice(0, 1);
  }

  /**
   * add movable object
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * add static objects
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   *
   * @param {*} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   *
   * @param {*} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
