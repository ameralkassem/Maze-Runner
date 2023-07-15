// Create a new scene
let gameScene = new Phaser.Scene("Game");
gameScene.score = 0;

gameScene.preload = function () {
  // Load images
  this.load.image("myTileset-image", "assets/images/level1taler.png");
  this.load.image("star", "assets/images/star.png");
  this.load.image("player", "assets/images/front-2.png");
  this.load.audio("collectSound", "assets/sounds/collect-star.mp3");
  this.load.spritesheet("gamePiece", "assets/images/all.png", {
    frameWidth: 60,
    frameHeight: 65,
  });

  // Load tilemap in JSON format
  this.load.tilemapTiledJSON("wallmap", "level-1-scene.json");
  // Load cup image
  this.load.image("cup", "assets/images/cup.png");
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
  gameScene.scoreText = this.add.text(16, 15, 'Score: 0',
    {
      fontSize: '32px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: 3
    });


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
  // Add an object that triggers the next level or scene
  this.triggerObject = this.physics.add.sprite(1000, 400, "cup"); // Use the cup image as the sprite for the trigger object
  this.triggerObject.setImmovable(true); // Make the trigger object immovable
  this.triggerObject.setCollideWorldBounds(true); // Keep the trigger object within the world bounds
  this.triggerObject.setDisplaySize(130, 130); // Set the width and height of the cup image

  this.physics.add.collider(this.player, this.triggerObject, this.nextLevel, null, this);
  this.physics.add.collider(this.triggerObject, layer); // Add collision between the trigger object and the map layer

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
  window.location.href = "index.html";
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
