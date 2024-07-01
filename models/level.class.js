class Level {
  enemies;
  boss;
  clouds;
  backgroundObjects;
  level_end_x = 720*6;

  constructor(enemies,boss, clouds, backgroundObjects, coins, salsa) {
    this.enemies = enemies;
    this.boss = boss
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.salsa = salsa;
  }
}
