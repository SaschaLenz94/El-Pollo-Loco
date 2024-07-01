class SmallChicken extends MovableObject {
  y = 385;
  height = 30;
  width = 50;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  smallChicken_sound = new Audio("./audio/chicken_dead_sound.mp3");

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 250 + Math.random() * 720 * 7;
    this.speed = 0.2 + Math.random() * 0.45;
    this.dead = false;
    this.smallChicken_sound.pause();
    this.smallChicken_sound.volume = 0.3;
    this.animate();
  }

  /**
   * start intervals
   */
  animate() {
    this.move();
    this.walkingAnimation();
    this.deadAnimation();
  }

  /**
   * interval for moveing left
   */
  move() {
    this.moveChicken = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * moving animation
   */
  walkingAnimation() {
    setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * animation when chicken is dead
   */
  deadAnimation() {
    setInterval(() => {
      if (this.dead) {
        clearInterval(this.moveChicken);
        this.loadImage(this.IMAGES_DEAD[0]); // Corrected typo in IMAGE_DEAD
      }
    }, 200);
  }

  /**
   * played sound
   */
  playDeathSound() {
    if (!soundOff) {
      this.smallChicken_sound.play();
    }
  }
}
