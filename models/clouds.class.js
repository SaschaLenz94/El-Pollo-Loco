class Clouds extends MovableObject {
  y = 30;
  height = 400;
  width = 600;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png","img/5_background/layers/4_clouds/2.png");

    this.x = Math.random() * (4*780);
    this.moveLeft();
  }
  d
  /**
   * let the clouds move slow to left
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
