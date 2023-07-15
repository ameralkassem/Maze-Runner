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
  // Load cup image
  this.load.image("cup", "cup.png");
};
gameScene.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset, 0, 0);
  layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 20, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.player.body.gravity.y = 0; // Disable gravity for falling

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

  // Jump parameters
  this.jumpForce = 300;
  this.isJumping = false;


};


gameScene.update = function (time, delta) {
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
  } else {
    this.player.setVelocityX(0);
  }

  // Jump control
  if (this.cursors.up.isDown && this.player.body.onFloor() && !this.isJumping) {
    this.player.setVelocityY(-this.jumpForce);
    this.isJumping = true;
  }

  // Stop upward movement when arrow up key is released
  if (this.cursors.up.isUp && this.isJumping) {
    if (this.player.body.velocity.y < -50) {
      this.player.setVelocityY(-50);
    }
    this.isJumping = false;
  }

  // Check if the player reaches the destination coordinates
  if (
    Math.abs(this.player.x - this.destinationX) < 5 &&
    Math.abs(this.player.y - this.destinationY) < 5
  ) {
    // Trigger the next level or scene
    this.nextLevel();
  }

  // Stop the player if no keys are pressed
  if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
    this.player.anims.play("stop");
    this.player.anims.stop();
  }
};

gameScene.nextLevel = function () {
  // Perform any necessary actions for transitioning to the next level or scene
  // For example, you can stop the current scene and start the next scene
  this.scene.stop();
  this.scene.start("NextLevelScene"); // Replace "NextLevelScene" with the name of your next level or scene
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
