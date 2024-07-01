class Salsa extends MovableObject {
  y = 355;
  x = 400;
  height = 70;
  width = 70;
  world;
  IMAGES_WALKING = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
      this.x = 250 + Math.random() * 720*4;
  }
  
/**
 * animate the coin
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 220);
  }
}
