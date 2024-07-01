class Endboss extends MovableObject {
  y = 40;
  height = 400;
  width = 300;
  speed = 2;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  intervalMAINID;
  percentage = 20;
  deadSound = new Audio("audio/win.mp3");
  hurting=false;

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 720 * 5.5;
    this.endbossIntervalls();
    this.animate();
    this.smallDistance = false;
    this.attackInterval = null;
    this.alertInterval = null;
    this.deadSound.volume = 0.3;
  }

  /**
   * animate the endboss
   */
  animate() {
    this.alertInterval = setInterval(() => {
      if (this.smallDistance) {
        this.walkAndAttack();
      } else {
        this.alert();
      }
    }, 200);
  }

  /**
   * animation when character not in smallDistance
   */
  alert() {
    this.playAnimation(this.IMAGES_ALERT);
    if (this.attackInterval) {
      clearInterval(this.attackInterval);
      this.attackInterval = null;
    }
  }

  /**
   * if character is in smallDistance animate and run to Character
   */
  walkAndAttack() {
    this.playAnimation(this.IMAGES_WALKING);
    if (!this.attackInterval) {
      this.attackInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
    }
  }

  /**
   * animations when boss hit by bottes
   */
  endbossIntervalls() {
    this.intervalMAINID = setInterval(() => {
      if (this.bossHurt && this.bossLife > 20) {
        this.endbossHurtAnimation();
      }
      if (this.bossLife < 20) {
        this.endbossDie();
        if (!soundOff) {
          this.deadSound.play();
        }
        setTimeout(() => {
          winningGame();
        }, 500);
      }
    }, 300);
  }

  /**
   * animation when boss hurt
   */
  endbossHurtAnimation() {
    let intervalBossHurt = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
    }, 50);
    setTimeout(() => {
      clearInterval(intervalBossHurt);
    }, 100);
    this.bossHurt = false;
  }

   /**
   * animation when boss died
   */
  endbossDie() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 250);
  }
}
