let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/wall-images.png");
  this.load.image("player", "assets/player-front.png");
  this.load.image("enemy", "assets/enemy.png");
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
  const grass_layer = map.createLayer("grass", tileset, 0, 0);
  const floor_layer = map.createLayer("floor", tileset, 0, 0);

  floor_layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 320, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, floor_layer);
  this.player.setDisplaySize(50, 60);

  this.player.body.setSize(50, 60);

  this.enemy = this.physics.add.sprite(400, 20, "enemy");
  this.enemy.setBounce(0.1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.enemy.setDisplaySize(80, 80);

  this.enemy.body.setSize(80, 80);

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
    key: "up",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("enemyPiece", {
      start: 0,
      end: 12,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Reverse the frames for "left" animation
  const reverseFrames = this.anims
    .generateFrameNumbers("enemyPiece", {
      start: 0,
      end: 12,
    })
    .reverse();

  // Create the "left" animation using the reversed frames
  this.anims.create({
    key: "left",
    frames: reverseFrames,
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();
};

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: gameScene,
};

let game = new Phaser.Game(config);
