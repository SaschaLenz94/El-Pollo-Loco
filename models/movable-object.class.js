class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  farmedCoins = 0;
  farmedSalsa = 0;
  lastHit = 0;
  coin_sound = new Audio("audio/coinfarm.mp3");
  salsa_sound = new Audio("audio/pickupsalsa.mp3");
  hit_sound = new Audio("audio/hit.mp3");
  bossLife = 100;
  bossHurt = false;
  bossHittet = false;


  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Die Schwerkraft für den Charakter und die Flaschen definieren..
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   *
   * @returns Throwable object should always fall.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 185;
    }
  }

  isColliding(mo) {
    let collidingFromLeft =
      this.x + this.offset.left + (this.width - this.offset.right) > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.offset.left + (mo.width - mo.offset.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.offset.top + (mo.height - mo.offset.bottom);

    let collidingFromRight =
      this.x < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x &&
      this.y + this.height - this.offset.bottom > mo.y &&
      this.y < mo.y + mo.height - mo.offset.bottom;

    return collidingFromLeft || collidingFromRight;
  }

  isCollidingTOP(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height < mo.y + mo.height / 2 &&
      this.y + this.height > mo.y
    );
  }

  /**
   * Zugefügter Schaden am Charakter in der Statusleiste.
   */
  hit() {
    this.energy -= 5;
    this.hit_sound.volume = 0.3;
    if (!soundOff) {
      this.hit_sound.play();
    }
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * gives the boss damage
   */
  endbossDamage() {
    this.bossLife -= 20;
    if (this.bossLife < 0) {
      this.bossLife = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   *
   * @returns
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

  /**
   * if character energy is 0 return isDead
   * @returns
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * elevated the counter when farm a coin
   */
  coinCounter() {
    if (this.farmedCoins < 100) {
      this.farmedCoins += 20;
    } else {
      this.farmedCoins = 100;
    }
    this.coin_sound.volume = 0.3;
    if (!soundOff) {
      this.coin_sound.play();
    }
  }

  /**
   * elevated the bottle counter if farm a salsabottle
   */
  salsaCounter() {
    if (this.farmedSalsa < 100) {
      this.farmedSalsa += 20;
    } else {
      this.farmedSalsa = 100;
    }
    this.salsa_sound.volume = 0.3;
    if (!soundOff) {
      this.salsa_sound.play();
    }
  }

  /**
   * The full value of an array with the images is iterated here,
   * and a variable with the path of the images selected for playback is declared here.
   * @param {Array with images} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * moves  right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * moves left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * the element jumping
   */
  jump() {
    this.speedY = 30;
  }
}
