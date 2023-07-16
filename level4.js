let gameScene = new Phaser.Scene("Game");
gameScene.score = 0;
gameScene.lives = 3;


// ================================================================================
// PRELOAD


gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/wall-images.png");
  this.load.image("player", "assets/player-front.png");
  this.load.image("enemy", "assets/fire-circle.png");
  this.load.image("star", "assets/star.png");
  this.load.image("heart", "assets/heart.png");
  this.load.audio("collectSound", "assets/collect-star.mp3");
  this.load.audio("playerDeathSound", "assets/playerDeath.mp3");
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


// ================================================================================
// CREATE


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
    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
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
  gameOverText.setOrigin(0.5); // Set the origin to the center of the text

  // Restart the scene after a delay
  scene.time.delayedCall(2000, function () {
    gameScene.score = 0;
    scene.scene.restart();
  });
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
    this.time.delayedCall(2000, function () {
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
  gameOverText.setOrigin(0.5); // Set the origin to the center of the text

  // Restart the scene after a delay
  scene.time.delayedCall(2000, function () {
    gameScene.score = 0;
    scene.scene.restart();
  });

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
