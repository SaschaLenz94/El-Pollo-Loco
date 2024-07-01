class BottleBar extends DrawableObject {
    IMAGES = [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];
    percentage = 0;
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 10;
      this.y = 90;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
    
  /**
   * this function set the actually percent of salsa counter in percent 
   * @param {number} percentage  is the percent of the value when farmed salsa 1 salsa = 20 percent
   */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
  /**
   * this function resolve the number of IMAGES in top of this document.
   * @returns  return whats number of images usable
   */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }