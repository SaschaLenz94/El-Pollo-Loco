class Coins extends MovableObject {
  y = 180;
  x = 150;
  width = 80;
  height = 80;
  world;
  offset = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 60,
};
  IMAGES_WALKING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 720 * 4;
    this.y = 250 - Math.random() * 110;
    this.animate();
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
