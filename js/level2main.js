let gameScene_level2 = new Phaser.Scene("Game");
const data = JSON.parse(localStorage.getItem("playerData"));

gameScene_level2.score = 0; // Initialize score variable
gameScene_level2.index = 0; // Initialize index variable

gameScene_level2.preload = function () {
  this.load.image("wall-image", "assets/images/maptaler.png");
  this.load.image("coin", "assets/images/star.png");
  this.load.audio("coinSound", "assets/sounds/collect-star.mp3");
  this.load.audio("countdown", "assets/sounds/countdown.mp3")
  this.load.image("player", `assets/images/frontsprite.png`);
  this.load.image("cup", "assets/images/cup.png");
  this.load.spritesheet("gamepieces", `assets/images/${data.image}`, {
    frameWidth: data.frameWidth,
    frameHeight: data.frameHeight,
  });
  this.load.spritesheet("leftPieces", `assets/images/${data.image}`, {
    frameWidth: data.left.frameWidth,
    frameHeight: data.left.frameHeight,
  });
  this.load.spritesheet("RightPieces", `assets/images/${data.right.image}`, {
    frameWidth: data.right.frameWidth,
    frameHeight: data.right.frameHeight,
  }); 
  this.load.spritesheet("UPPieces", `assets/images/${data.up.image}`, {
    frameWidth: data.up.frameWidth,
    frameHeight: data.up.frameHeight,
  });

  this.load.tilemapTiledJSON("wallmap", "assets/map/gameScene_level2.json");
};
gameScene_level2.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "wall-image");
  const floor_layer = map.createLayer("floor", tileset, 0, 0);
  const grass_layer = map.createLayer("grass", tileset, 0, 0);
  this.createCoins();

  floor_layer.setCollisionByExclusion(-1, true);

  this.player = this.physics.add.sprite(0, 20, "player");
  this.player.setScale(0.9);
  this.player.setCollideWorldBounds(true);
  this.player.body.gravity.y = 500;
  this.physics.add.collider(this.player, floor_layer);
  this.physics.add.collider(this.coins, floor_layer);

  let isCountdownPlaying = false;

  se_cup = this.physics.add.sprite(480, 250, "cup").disableBody(true, true);
  se_cup.setImmovable(true);
  se_cup.setDisplaySize(125, 145);
  se_cup.setCollideWorldBounds(true);

  this.physics.add.collider(se_cup, floor_layer);

  this.physics.add.collider(this.player, se_cup, this.nextLevel, null, this);

  gameScene_level2.scoreText = this.add.text(16, 10, "Score: 0", {
    fontSize: "32px",
    fill: "#ffffff",
    backgroundColor: "#000000",
    padding: 3,
  });

  // Set the time limit (in milliseconds)
  const timeLimit = 80000; // 80 seconds

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
      gameScene_level2.sound.play("countdown");
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
    } else {
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    }
  }

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("leftPieces", {
      start: data.left.leftAnims.start,
      end: data.left.leftAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("RightPieces", {
      start: data.right.rightAnims.start,
      end: data.right.rightAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("gamepieces", {
      start: data.downAnims.start,
      end: data.downAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("UPPieces", {
      start: data.up.upAnims.start,
      end: data.up.upAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stop",
    frames: this.anims.generateFrameNumbers("gamepieces", {
      start: data.stopAnims.start,
      end: data.stopAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();
};

gameScene_level2.createCoins = function () {
  this.coins = this.physics.add.group();

  const coin = this.coins.create(500, 20, "coin");
  coin.setBounce(Phaser.Math.FloatBetween(0.5, 0.8));
  coin.setDisplaySize(50, 50);
};

// Restart the level
gameScene_level2.restartLevel = function () {
  const scene = gameScene_level2;

  // freeze the player
  scene.physics.pause();

  // Restart level
  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "Time's up!",
    {
      font: "bold 80px Arial",
      fill: "#ff0000",
      backgroundColor: "#00000",
      padding: 15,
    }
  );

  gameOverText.setOrigin(0.5); // Set the origin to the center of the text

  // Restart the scene after a delay
  scene.time.delayedCall(2000, function () {
    gameScene_level2.score = 0;
    gameScene_level2.index = 0;
    scene.scene.restart();
  });
};

gameScene_level2.update = function () {
  // Call the updateTimer function every frame
  this.updateTimer();

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
    this.player.anims.play("up", true);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
    this.player.anims.play("down", true);
  } else {
    this.player.setVelocityX(0);
    // this.player.setVelocityY(0);
    this.player.anims.play("stop");

    this.player.anims.stop();
  }

  this.physics.overlap(this.player, this.coins, this.collectCoin, null, this);

  gameScene_level2.collectCoin = function (player, coin) {
    gameScene_level2.index += 1;
    gameScene_level2.time.delayedCall(300, function () {
      const coinPositions = [
        { x: 500, y: 20 }, // 2
        { x: 890, y: 170 }, // 3
        { x: 500, y: 500 }, // 4
        { x: 500, y: 700 }, // 5
        { x: 890, y: 600 }, // 6
        { x: 1200, y: 100 }, // 7
        { x: 670, y: 300 }, // 8
        { x: 390, y: 220 }, // 9
        { x: 90, y: 330 }, // 10
      ];
      if (gameScene_level2.index < coinPositions.length) {
        const coin = gameScene_level2.coins.create(
          coinPositions[gameScene_level2.index].x,
          coinPositions[gameScene_level2.index].y,
          "coin"
        );
        coin.setBounce(Phaser.Math.FloatBetween(0.5, 0.8));
        coin.setDisplaySize(50, 50);
      } else {
        se_cup.enableBody(true, 480, 260, true, true);
      }
    });

    this.sound.play("coinSound");
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);

    coin.disableBody(true, true);
  };
};
gameScene_level2.nextLevel = function () {
  this.scene.stop();
  window.location.href = "../level3index.html";
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

const config = {
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
  scene: gameScene_level2,
};

const game = new Phaser.Game(config);