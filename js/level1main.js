// Create a new scene
let gameScene = new Phaser.Scene("level1");
gameScene.score = 0;

const data = JSON.parse(localStorage.getItem("playerData"));

gameScene.preload = function () {
  // the below code is to load the images
  this.load.image("myTileset-image", "assets/images/maptaler.png");
  this.load.image("star", "assets/images/star.png");
  this.load.image("player", "assets/images/frontsprite.png"); //data.palyer.image
  this.load.audio("collectSound", "assets/sounds/collect-star.mp3");
  this.load.spritesheet("gamePiece", `assets/images/${data.image}`, {
    frameWidth: data.frameWidth,
    frameHeight: data.frameHeight,
  }); //data.image , data.frameWidth , data.farmeHeight

  this.load.spritesheet("leftPieces", `assets/images/${data.image}`, {
    frameWidth: data.left.frameWidth,
    frameHeight: data.left.frameHeight,
  }); //data.left.image , data.left.frameWidth , data.left.farmeHeight
  this.load.spritesheet("RightPieces", `assets/images/${data.right.image}`, {
    frameWidth: data.right.frameWidth,
    frameHeight: data.right.frameHeight,
  }); //data.right.image , data.right.frameWidth , data.right.farmeHeight
  this.load.spritesheet("UPPieces", `assets/images/${data.up.image}`, {
    frameWidth: data.up.frameWidth,
    frameHeight: data.up.farmeHeight,
  });
  // the below code is to load the map
  this.load.tilemapTiledJSON("wallmap", "assets/map/gameScene_level1.json");
  // the below code is to load the cup image
  this.load.image("cup", "assets/images/cup.png");
};

// the below code is to set up the game and collisino

gameScene.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset, 0, 0);
  layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 20, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);

  // Disable gravity for falling
  this.player.body.gravity.y = 0;
  this.physics.add.collider(this.player, layer);
  gameScene.scoreText = this.add.text(16, 15, "Score: 0", {
    fontSize: "32px",
    fill: "#ffffff",
    backgroundColor: "#000000",
    padding: 3,
  });

  // the below code is to set the movement of the sprite
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("leftPieces", {
      start: data.left.leftAnims.start,
      end: data.left.leftAnims.end,
    }), //gamePieces-left , data.left.leftAnims.start , data.left.leftAnims.end
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("RightPieces", {
      start: data.right.rightAnims.start,
      end: data.right.rightAnims.end,
    }), //gamePieces-right , data.right.rightAnims.start , data.right.rightAnims.end
    frameRate: 10,
    repeat: -1,
  });

  // this.anims.create({
  //   key: "up",
  //   frames: this.anims.generateFrameNumbers("gamePiece-up", {
  //     start: data.up.upAnims.start,
  //     end: data.up.upAnims.end,
  //   }),
  //   frameRate: 10,
  //   repeat: -1,
  // });

  // this.anims.create({
  //   key: "down",
  //   frames: this.anims.generateFrameNumbers("gamePiece", {
  //     start: data.downAnims.start,
  //     end: data.downAnims.end,
  //   }),
  //   frameRate: 10,
  //   repeat: -1,
  // });

  this.anims.create({
    key: "stop",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: data.stopAnims.start, //data.stopAnims.start
      end: data.stopAnims.end, //data.stopAnims.end
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  // set the jump force of the sprite
  this.jumpForce = 300;

  // setting a trigger so whenever the sprite touch the cup it moves to another map
  this.triggerObject = this.physics.add.sprite(1000, 400, "cup");
  // Make the trigger object immovable
  this.triggerObject.setImmovable(true);
  // Keep the trigger object within the world bounds
  this.triggerObject.setCollideWorldBounds(true);
  // Set the width and height of the cup image
  this.triggerObject.setDisplaySize(130, 130);

  // Add collision between the trigger object and the map layer
  this.physics.add.collider(
    this.player,
    this.triggerObject,
    this.nextLevel,
    null,
    this
  );
  this.physics.add.collider(this.triggerObject, layer);

  this.createStars(); // Create the stars

  // Add collision between the stars and the map layer
  this.physics.add.collider(this.stars, layer);

  // Set the time limit (in milliseconds)
  const timeLimit = 60000; // 60 seconds

  // Start the timer
  const timer = this.time.addEvent({
    delay: timeLimit,
    callback: this.redirectToLandingPage,
    callbackScope: this,
  });

  // Display the timer text
  this.timerText = this.add.text(
    200,
    15,
    "Time Limit: " + formatTime(timeLimit),
    {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: 3,
    }
  );

  // Update the timer text every frame
  this.updateTimer = () => {
    const remainingTime = Math.max(timeLimit - timer.getElapsed(), 0);
    this.timerText.setText("Time: " + formatTime(remainingTime));
  };
};

gameScene.createStars = function () {
  // Create a group to hold the stars
  this.stars = this.physics.add.group();

  const starPositions = [
    { x: 100, y: 150 },
    { x: 100, y: 320 },
    { x: 340, y: 120 },
    { x: 390, y: 220 },
    { x: 230, y: 460 },
    { x: 330, y: 460 },
    { x: 420, y: 70 },
    { x: 630, y: 300 },
    { x: 890, y: 170 },
  ];

  starPositions.forEach((position) => {
    const star = this.stars.create(position.x, position.y, "star");
    star.setBounce(Phaser.Math.FloatBetween(0.5, 0.8));
    star.setDisplaySize(50, 50);
  });
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
    this.player.play("right", true);

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

  // Check for collision between the player and stars
  this.physics.overlap(this.player, this.stars, this.collectStar, null, this);

  // Call the updateTimer function every frame
  this.updateTimer();
};

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}

gameScene.redirectToLandingPage = function () {
  // Redirect to the landing page
  window.location.href = "./level1index.html";
};

gameScene.collectStar = function (player, star) {
  // Play a sound when a star is collected
  this.sound.play("collectSound");
  // Update the score
  this.score += 1;
  this.scoreText.setText("Score: " + this.score);

  // Remove the star from the group and destroy it
  star.disableBody(true, true);

};

gameScene.nextLevel = function () {

  window.location.href = "../level2index.html";

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
