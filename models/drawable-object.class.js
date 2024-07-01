class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 290;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {array} arr  load the array of the images for an animate.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * 
   * draw the loaded pictures
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("no image", e);
      console.log(" not load image", this.img.src);
    }
  }

  /**
   * gibt jedem character oder chicken einen rahmen.
   */
  drawFrame(ctx) {
    // if (this instanceof Character || this instanceof Chicken || this instanceof Salsa || this instanceof Coins || this instanceof ThrowableObject || this instanceof Endboss) {
    //   ctx.beginPath();
    //   ctx.lineWidth = "5";
    //   ctx.strokeStyle = "blue";
    //   ctx.rect(this.x, this.y, this.width, this.height);
    //   ctx.stroke();
    // }
  }
}
