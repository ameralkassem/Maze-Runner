// Create a new scene
let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  // Load images
  this.load.image("myTileset-image", "level1taler.png");
  this.load.image("player", "front-2.png");
  this.load.spritesheet("gamePiece", "all.png", {
    frameWidth: 60,
    frameHeight: 65,
  });

  // Load tilemap in JSON format
  this.load.tilemapTiledJSON("wallmap", "level-1-scene.json");
};
// https://medium.com/@michaelwesthadley/molar-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
// https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
// https://www.makeuseof.com/animate-sprite-with-phaser/
gameScene.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset, 0, 0);
  layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 20, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, layer);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 7,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stop",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();
};
gameScene.update = function () {
  // Control the player with left or right keys
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    if (this.player.body.onFloor()) {
      this.player.anims.play("left", true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    if (this.player.body.onFloor()) {
      this.player.play("right", true);
    }
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-200);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0);
    this.player.anims.play("stop");
    this.player.anims.stop();
  }
};
let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false, // Enable physics debugging
    },
  },
  scene: gameScene,
};

// Create a new game
let game = new Phaser.Game(config);
