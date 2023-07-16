let gameScene = new Phaser.Scene("level3");
gameScene.score = 0;
gameScene.lives = 3;

gameScene.preload = function () {

  // the below code is to load the images of the game
  this.load.image("myTileset-image", "assets/images/maptaler.png");
  this.load.image("star", "assets/images/star.png");
  this.load.image("player", "assets/images/frontsprite.png");
  this.load.image("enemy", "assets/images/fire-circle.png");
  this.load.image("heart", "assets/images/heart.png");
  this.load.audio("collectSound", "assets/sounds/collect-star.mp3");
  this.load.audio("countdown", "assets/sounds/countdown.mp3");
  this.load.audio("gameover", "assets/sounds/gameOver.mp3");
  this.load.audio("playerDeathSound", "assets/sounds/playerDeath.mp3");
  this.load.spritesheet("gamePiece", "assets/images/allsprite.png", {
    frameWidth: 60,
    frameHeight: 65,
  });
  this.load.spritesheet("enemyPiece", "assets/images/fire-circle.png", {
    frameWidth: 60,
    frameHeight: 110,
  });

  // the below code is to load the map
  this.load.tilemapTiledJSON("wallmap", "assets/map/gameScene_level3.json");
  // the below code is to load the cup image
  this.load.image("cup", "assets/images/cup.png");
};


gameScene.isGameOverPlaying = false;

gameScene.create = function () {

  // the below code is to show map with the walls , herbs, etc and without allowing 
  // the the player to move in it 
  gameScene.sound.stopAll();
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset, 0, 0);
  layer.setCollisionByExclusion(-1, true);
  const layer2 = map.createStaticLayer("herb1", tileset, 0, 0);
  layer2.setCollisionByExclusion(-1, true);
  const layer3 = map.createStaticLayer("herb2", tileset, 0, 0);
  layer3.setCollisionByExclusion(-1, true);

  let isCountdownPlaying = false;

  this.player = this.physics.add.sprite(50, 20, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.player.body.gravity.y = 0;
  this.physics.add.collider(this.player, layer);
  this.physics.add.collider(this.player, layer2);


  // the below code is used show the game score 
  gameScene.scoreText = this.add.text(16, 10, `Score: ${gameScene.score}`,
    {
      fontSize: '32px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: 3
    });

  this.createHearts(); // Create the hearts
  this.createStars(); // Create the stars

  // enemy 1
  this.enemy = this.physics.add.sprite(110, 175, "enemy");
  this.enemy.setBounce(1);
  this.enemy.setCollideWorldBounds(true);
  this.physics.add.collider(this.enemy, layer);
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);
  this.enemy.setDisplaySize(100, 80);
  this.enemy.body.gravity.y = -150;
  this.enemy.body.setSize(200, 290);


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
    callback: this.restartLevel,
    callbackScope: this,
  });

  // Display the timer text
  this.timerText = this.add.text(
    200,
    10,
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

  function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    let millisecondsRemaining = milliseconds % 1000;

    // Play a countdown sound effect when the timer reaches 20 seconds
    if (seconds == 20 && minutes === 0 && isCountdownPlaying === false) {
      gameScene.sound.play("countdown");
      isCountdownPlaying = true;
    }

    if (minutes == 0 && seconds == 0) {
      millisecondsRemaining = 0;
    }

    if (minutes === 0 && seconds <= 10) {
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        ":" +
        millisecondsRemaining.toString().substr(0, 3)
      );
    }

    else {
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    }

  }

};


gameScene.restartLevel = function () {
  const scene = gameScene;

  // freeze the player
  scene.physics.pause();

  // remove one heart
  gameScene.lives -= 1;



  // Restart level
  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "Time's up!",
    {
      font: 'bold 80px Arial',
      fill: '#ff0000',
      backgroundColor: '#00000',
      padding: 15,
    }
  );

  // Create a heart and set its display size
  const heart = scene.add.image(
    scene.cameras.main.centerX - 70,
    scene.cameras.main.centerY,
    "heart"
  );
  heart.setDisplaySize(140, 80);
  const gameOverText2 = scene.add.text(
    scene.cameras.main.centerX - 20,
    scene.cameras.main.centerY - 40,
    "x" + gameScene.lives,
    {
      font: '70px Arial',
      fill: '#ffff',
    }
  );


  gameOverText.setOrigin(0.5); // Set the origin to the center of the text

  // Restart the scene after a delay
  if (gameScene.lives > 0) {
    scene.time.delayedCall(2000, function () {
      gameScene.score = 0;
      scene.scene.restart();
    });
  }
};



// to create hearts
gameScene.createHearts = function () {

  let life = gameScene.lives;

  // Create a group to hold the hearts
  this.hearts = this.physics.add.group({
    key: "heart",
    repeat: life - 1,
    setXY: { x: gameScene.sys.game.config.width - 250, y: 30, stepX: 70 },
  });

  this.hearts.children.iterate(function (child) {
    child.setDisplaySize(70, 40);
    child.setGravityY(-200);
  });
};

gameScene.createStars = function () {
  // Create a group to hold the stars
  this.stars = this.physics.add.group();

  const starPositions = [
    { x: 700, y: 150 },
    { x: 800, y: 320 },
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

  this.enemy.rotation += 0.1;

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


  // Check if lives are 0
  if (gameScene.lives === 0) {
    // Remove Heart
    this.hearts.children.entries[gameScene.lives].disableBody(true, true);

    // Stop Countdown Sound
    gameScene.sound.stopByKey("countdown");

    //Delay Game Over Sound
    this.time.delayedCall(100, function () { });
    if (this.isGameOverPlaying == false) {
      gameScene.sound.play("gameover");
      this.isGameOverPlaying = true;
    }

    const gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      "Game Over!", {
      font: 'bold 80px Arial',
      fill: '#ff0000',
      backgroundColor: '#00000',
      padding: 15,
    }
    );

    gameOverText.setOrigin(0.5); // Set the origin to the center of the text

    // Freeze physics 
    this.physics.pause();

    // Redirect To Landing Page
    this.time.delayedCall(4500, function () {
      window.location.href = "index.html";
    }
    );

  }

  // Call the updateTimer function every frame
  this.updateTimer();

};


//overlap function
gameScene.onOverlap = function (enemy, player) {
  const scene = gameScene; // Store reference to the scene
  // stop countdown sound
  scene.sound.stopByKey("countdown");

  // Delay time for 0.5 seconds
  scene.time.delayedCall(500, function () { });


  // Kill the player
  scene.sound.play("playerDeathSound");
  player.setTint(0xff0000);

  // Freeze the player
  scene.physics.pause();

  // remove one heart
  gameScene.lives -= 1;

  // Create a text object to display "You died"
  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "You died!",
    {
      font: 'bold 80px Arial',
      fill: '#ff0000',
      backgroundColor: '#00000',
      padding: 15,
    }
  );

  // Create a heart and set its display size
  const heart = scene.add.image(
    scene.cameras.main.centerX - 70,
    scene.cameras.main.centerY,
    "heart"
  );
  heart.setDisplaySize(140, 80);
  const gameOverText2 = scene.add.text(
    scene.cameras.main.centerX - 20,
    scene.cameras.main.centerY - 40,
    "x " + gameScene.lives,
    {
      font: '70px Arial',
      fill: '#ffff',
    }
  );



  gameOverText.setOrigin(0.5); // Set the origin to the center of the text

  // Restart the scene after a delay
  if (gameScene.lives > 0) {
    scene.time.delayedCall(2000, function () {
      gameScene.score = 0;
      scene.scene.restart();
    });
  }

};




gameScene.redirectToLandingPage = function () {
  // Redirect to the landing page
  window.location.href = "./level3index.html";
};

gameScene.collectStar = function (player, star) {
  // Play a sound when a star is collected
  this.sound.play("collectSound");
  // Update the score
  this.score += 1;
  gameScene.scoreText.setText("Score: " + this.score);

  // Remove the star from the group and destroy it
  star.disableBody(true, true);

};

gameScene.nextLevel = function () {

  this.scene.stop();
  window.location.href = "../level4index.html";
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
