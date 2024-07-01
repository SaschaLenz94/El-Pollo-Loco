class Keyboard {
  LEFT = false;
  RIGHT = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    window.addEventListener("resize", this.checkScreenWidth);
    this.bindKeyPressEvents();
    this.checkScreenWidth(); // Sofortige Überprüfung der Bildschirmbreite beim Initialisieren
  }

  checkScreenWidth() {
    if (window.innerWidth < 936) {
      this.bindTouchPressEvents();
    }
  }

  bindKeyPressEvents() {
    window.addEventListener("keydown", this.handleKeyDownEvent);
    window.addEventListener("keyup", this.handleKeyUpEvent);
  }

  bindTouchPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", this.handleTouchStartLeft);
    document.getElementById("btnLeft").addEventListener("touchend", this.handleTouchEndLeft);

    document.getElementById("btnRight").addEventListener("touchstart", this.handleTouchStartRight);
    document.getElementById("btnRight").addEventListener("touchend", this.handleTouchEndRight);

    document.getElementById("btnUp").addEventListener("touchstart", this.handleTouchStartUp);
    document.getElementById("btnUp").addEventListener("touchend", this.handleTouchEndUp);

    document.getElementById("btnThrow").addEventListener("touchstart", this.handleTouchStartThrow);
    document.getElementById("btnThrow").addEventListener("touchend", this.handleTouchEndThrow);

    let panelBottomImages = document.querySelectorAll(".panel-bottom img");
    
    panelBottomImages.forEach((image) => {
      image.addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });
    });
  }

  handleKeyDownEvent = (event) => {
    const key = event.keyCode;
    if (key === 39) {
      this.RIGHT = true;
    } else if (key === 37) {
      this.LEFT = true;
    } else if (key === 38) {
      this.UP = true;
    } else if (key === 40) {
      this.DOWN = true;
    } else if (key === 32) {
      this.SPACE = true;
    } else if (key === 68) {
      this.D = true;
    }
  };

  handleKeyUpEvent = (event) => {
    const key = event.keyCode;
    if (key === 39) {
      this.RIGHT = false;
    } else if (key === 37) {
      this.LEFT = false;
    } else if (key === 38) {
      this.UP = false;
    } else if (key === 40) {
      this.DOWN = false;
    } else if (key === 32) {
      this.SPACE = false;
    } else if (key === 68) {
      this.D = false;
    }
  };

  handleTouchStartLeft = (e) => {
    e.preventDefault();
    this.LEFT = true;
  };

  handleTouchEndLeft = (e) => {
    e.preventDefault();
    this.LEFT = false;
  };

  handleTouchStartRight = (e) => {
    e.preventDefault();
    this.RIGHT = true;
  };

  handleTouchEndRight = (e) => {
    e.preventDefault();
    this.RIGHT = false;
  };

  handleTouchStartUp = (e) => {
    e.preventDefault();
    this.SPACE = true;
  };

  handleTouchEndUp = (e) => {
    e.preventDefault();
    this.SPACE = false;
  };

  handleTouchStartDown = (e) => {
    e.preventDefault();
    this.DOWN = true;
  };

  handleTouchEndDown = (e) => {
    e.preventDefault();
    this.DOWN = false;
  };

  handleTouchStartThrow = (e) => {
    e.preventDefault();
    this.D = true;
  };

  handleTouchEndThrow = (e) => {
    e.preventDefault();
    this.D = false;
  };
}
