let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/wall-images.png");
  this.load.image("player", "assets/player-front.png");
  this.load.spritesheet("gamePiece", "assets/player-pieces.png", {
    frameWidth: 60,
    frameHeight: 65,
  });
  this.load.spritesheet("enemyPiece", "assets/enemy-pieces.png", {
    frameWidth: 60,
    frameHeight: 65,
  });

  this.load.tilemapTiledJSON("Gamemap", "map.json");
};

gameScene.create = function () {
  const map = this.make.tilemap({ key: "Gamemap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const background_layer = map.createLayer("background", tileset, 0, 0);
  const floor_layer = map.createLayer("floor", tileset, 0, 0);
  const grass_layer = map.createLayer("grass", tileset, 0, 0);

  floor_layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 320, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, floor_layer);
};

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: gameScene,
};

let game = new Phaser.Game(config);
