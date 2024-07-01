let level1;
/**
 * Create Enemies
 */

function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
    ],
    [new Endboss()],
    /**
     * create the cloud
     */
    [new Clouds(), new Clouds(), new Clouds()],
    /**
     * create the background images
     */
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
    ],
    /**
     * spawn the coins in level
     */
    [new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),],
    /**
     * spawn the salsas in level
     */
    [
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
      new Salsa(),
    ]
  );
}
