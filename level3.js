let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/wall-images.png");
  this.load.image("player", "assets/player-front.png");
  this.load.image("enemy", "assets/fire-circle.png");
  this.load.spritesheet("gamePiece", "assets/all-player-pieces.png", {
    frameWidth: 60,
    frameHeight: 65,
  });
  this.load.spritesheet("enemyPiece", "assets/fire-circle.png", {
    frameWidth: 60,
    frameHeight: 110,
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
  // enemy 1
  this.enemy = this.physics.add.sprite(643, 20, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);

  // enemy 2
  this.enemy = this.physics.add.sprite(450, 140, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);

  // enemy 3
  this.enemy = this.physics.add.sprite(930, 250, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);

  // enemy 4
  this.enemy = this.physics.add.sprite(830, 550, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);

  // enemy 5
  this.enemy = this.physics.add.sprite(160, 50, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, floor_layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: 7,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Get the number of frames in the "gamePiece" texture

  console.log(this.spritesheet);

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
    frameWidth: 32,
    frameHeight: 32,
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
    key: "stop",
    frames: [{ key: "player", frame: 0 }],
    frameRate: 10,
  });

  this.cursors = this.input.keyboard.createCursorKeys();
};

gameScene.update = function () {
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    if (this.player.body.onFloor()) {
      this.player.anims.play("left", true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    if (this.player.body.onFloor()) {
      this.player.anims.play("right", true);
    }
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-200);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
    if (!this.player.body.onFloor()) {
      this.player.anims.play("down", true);
    }
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play("stop");
    this.player.anims.stop();
  }
};
gameScene.onOverlap = function (player, enemy) {
  console.log("hi");
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
