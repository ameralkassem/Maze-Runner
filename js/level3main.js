

let gameScene = new Phaser.Scene("level3");
gameScene.score = 0;

gameScene.preload = function () {

  // the below code is to load the images of the game
  this.load.image("myTileset-image", "assets/images/maptaler.png");
  this.load.image("star", "assets/images/star.png");
  this.load.image("player", "assets/images/frontsprite.png");
  this.load.audio("collectSound", "assets/sounds/collect-star.mp3");
  this.load.spritesheet("gamePiece", "assets/images/allsprite.png", {
    frameWidth: 60,
    frameHeight: 65,
  });

  // the below code is to load the map
  this.load.tilemapTiledJSON("wallmap", "assets/map/gameScene_level3.json");
  // the below code is to load the cup image
  this.load.image("cup", "assets/images/cup.png");
};


gameScene.create = function () {

  // the below code is to show map with the walls , herbs, etc and without allowing 
  // the the player to move in it 
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset, 0, 0);
  layer.setCollisionByExclusion(-1, true);
  const layer2 = map.createStaticLayer("herb1", tileset, 0, 0);
  layer2.setCollisionByExclusion(-1, true);
  const layer3 = map.createStaticLayer("herb2", tileset, 0, 0);
  layer3.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(50, 20, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.player.body.gravity.y = 0;
  this.physics.add.collider(this.player, layer);
  this.physics.add.collider(this.player, layer2);


  // the below code is used show the game score 
  gameScene.scoreText = this.add.text(16, 15, 'Score: 0',
    {
      fontSize: '32px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: 3
    });

  // the below code is related to the movement of the sprite based on keyboard keys and allsprite.png
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

  // Jto add jumpforce to sprite
  this.jumpForce = 300;

  // to trigger whenever the sprite touches the cup
  this.triggerObject = this.physics.add.sprite(70, 700, "cup");
  this.triggerObject.setImmovable(true);
  this.triggerObject.setCollideWorldBounds(true);
  this.triggerObject.setDisplaySize(130, 130);

  this.physics.add.collider(this.player, this.triggerObject, this.nextLevel, null, this);
  this.physics.add.collider(this.triggerObject, layer);

  //to create stars
  this.createStars();


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

// this function is for time
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
  window.location.href = "./level3index.html";
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

  this.scene.stop();
  this.scene.start("NextLevelScene");
};

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
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
