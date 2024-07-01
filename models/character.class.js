class Character extends MovableObject {
  y = 185;
  height = 240;
  width = 100;
  speed = 10;
  camera_x;

  offset = {
    top: 80,
    left: 20,
    right: 50,
    bottom: 85,
  };
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/2_walk/W-21.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_STAY = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/walk.mp3");
  loose = new Audio("audio/loose.mp3");
  jumpSound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_STAY);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.coin_sound.pause();
    this.salsa_sound.pause();
    this.hit_sound.pause();
    this.loose.pause();
    this.jumpSound.pause();
    this.walking_sound.pause();
    this.loose.volume = 0.3;
    this.jumpSound.volume = 0.3;
    this.walking_sound.volume= 0.3;
    this.sleepingStart = Date.now();
  }

  /**
   * this function play the sound of the actually situation.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);

    setInterval(() => this.playCharacter(), 200);
  }

  /**
   * Move the Character
   */
  moveCharacter() {
    this.walking_sound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.characterMoveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.characterMoveLeft();
    }
    if (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround())
    ) {
      if (!soundOff) {
        this.jumpSound.play();
      }
      this.characterJump();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Animate the Character
   */
  playCharacter() {
    if (this.isDead()) {
      if (!soundOff) {
        this.loose.play();
      }
      this.playAnimation(this.IMAGES_DEAD);
      gameOver();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.idleTimer()) {
      this.playAnimation(this.IMAGES_SLEEP);
    } else {
      this.playAnimation(this.IMAGES_STAY);
    }
  }

  /**
   * 
   * if idle timer
   * 
   * @returns if timer >= 5
   */
  idleTimer() {
    let idleTime = (Date.now() - this.idleStart) / 1000;
    return idleTime >= 5;
  }

  resetIdleStartTimer() {
    this.idleStart = Date.now();
  }

  /**
   * the function when the character moving right
   */
  characterMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.walking_sound.volume = 0.3;
    this.walkingSoundPlay();
    this.resetIdleStartTimer();
  }

  /**
   * the function when the character moving left
   */
  characterMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.walking_sound.volume = 0.3;
    this.walkingSoundPlay();
    this.resetIdleStartTimer();
  }

  /**
   * the function when the character jump
   */
  characterJump() {
    this.jump();
  }


  /**
   * Start walking sound when sound on
   */
  walkingSoundPlay() {
    if (!soundOff) {
      this.walking_sound.play();
    }
  }
}
