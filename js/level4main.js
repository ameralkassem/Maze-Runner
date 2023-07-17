let gameScene = new Phaser.Scene("level4");
gameScene.score = 0;
gameScene.lives = 3;


// ================================================================================
// PRELOAD


gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/images/maptaler.png");
  this.load.image("player", "assets/images/player-front.png");
  this.load.image("enemy", "assets/images/fire-circle.png");
  this.load.image("star", "assets/images/star.png");
  this.load.image("heart", "assets/images/heart.png");
  this.load.image("cup", "assets/images/cup.png");
  this.load.audio("collectSound", "assets/sounds/collect-star.mp3");
  this.load.audio("countdown", "assets/sounds/countdown.mp3");
  this.load.audio("playerDeathSound", "assets/sounds/playerDeath.mp3");
  this.load.audio("gameover", "assets/sounds/gameOver.mp3");
  this.load.spritesheet("gamePiece", "assets/images/all-player-pieces.png",

    {
      frameWidth: 60,
      frameHeight: 65,
    });
  this.load.spritesheet("enemyPiece", "assets/images/fire-circle.png", {
    frameWidth: 60,
    frameHeight: 110,
  });

  this.load.tilemapTiledJSON("Gamemap", "assets/map/gameScene_level4.json");
};


// ================================================================================
// CREATE

gameScene.isGameOverPlaying = false;

gameScene.create = function () {
  gameScene.sound.stopAll();
  const map = this.make.tilemap({ key: "Gamemap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const background_layer = map.createLayer("background", tileset, 0, 0);
  const grass_layer = map.createLayer("grass", tileset, 0, 0);
  const floor_layer = map.createLayer("floor", tileset, 0, 0);

  floor_layer.setCollisionByExclusion(-1, true);
  let isCountdownPlaying = false;

  this.player = this.physics.add.sprite(0, 320, "player");
  this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, floor_layer);
  this.player.setDisplaySize(50, 60);

  this.player.body.setSize(50, 60);

  gameScene.scoreText = this.add.text(16, 10, `Score: ${gameScene.score}`,
    {
      fontSize: '32px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: 3
    });


  this.createHearts();
  this.createStars(); // Create the stars

  // Add collision between the stars and the map layer
  this.physics.add.collider(this.stars, floor_layer);



  // Set the time limit (in milliseconds)
  const timeLimit = 90000; // 90 seconds

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


  gameScene.collectStar = function (player, star) {
    // Play a sound when a star is collected
    this.sound.play("collectSound");
    // Update the score
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);

    // Remove the star from the group and destroy it
    star.disableBody(true, true);

  };




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
  this.physics.add.overlap(this.enemy, this.player, this.onOverlap);// when player and enemy overlap (function line 156)
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



  // setting a trigger so whenever the sprite touch the cup it moves to another map
  this.triggerObject = this.physics.add.sprite(1350, 800, "cup");
  // Make the trigger object immovable
  this.triggerObject.setImmovable(true);
  // Keep the trigger object within the world bounds
  this.triggerObject.setCollideWorldBounds(true);
  // Set the width and height of the cup image
  this.triggerObject.setDisplaySize(115, 115);

  this.physics.add.collider(this.player, this.triggerObject, this.nextLevel, null, this);



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

gameScene.createStars = function () {
  // Create a group to hold the stars
  this.stars = this.physics.add.group();

  const starPositions = [
    { x: 100, y: 150 },
    { x: 100, y: 320 },
    { x: 240, y: 120 },
    { x: 550, y: 520 },
    { x: 230, y: 460 },
    { x: 330, y: 460 },
    { x: 420, y: 60 },
    { x: 630, y: 300 },
    { x: 925, y: 150 },
    { x: 1000, y: 450 },
    { x: 1120, y: 500 },
  ];

  starPositions.forEach((position) => {
    const star = this.stars.create(position.x, position.y, "star");
    star.setBounce(Phaser.Math.FloatBetween(0.5, 0.8));
    star.setDisplaySize(50, 50);
  });
};


// ================================================================================
// UPDATE


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

  // Check for collision between the player and stars
  this.physics.overlap(this.player, this.stars, this.collectStar, null, this);


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

    // Check if the player reaches the destination coordinates
    if (
      Math.abs(this.player.x - this.destinationX) < 5 &&
      Math.abs(this.player.y - this.destinationY) < 5
    ) {
      // Trigger the next level or scene
      this.nextLevel();
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
      window.location.href = "../level1index.html";
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
gameScene.nextLevel = function () {

  if (gameScene.score == 11) {
    window.location.href = "../congratnoob.html";
  }

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