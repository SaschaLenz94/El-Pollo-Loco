class ThrowableObject extends MovableObject {
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
  ];
  splash = false;
  acceleration = 5.0;
  offset = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  };

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.animate();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.trow();
  }

  trow() {
    this.speedY = 35;
    this.applyGravity();
    this.bottleXIntervall = setInterval(() => {
      this.x += 15;
    }, 25);
  }

  /**
   * animation when the bottle throw or splash
   */
  animate() {
    setInterval(() => {
      if (!this.splash) {
        this.playAnimation(this.IMAGES_THROW);
      }
    }, (1000 / 60) * 4);
    setInterval(() => {
      if (this.splash) {
        this.playAnimation(this.IMAGES_SPLASH);
      }
    }, 50);
  }
}
