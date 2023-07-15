let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  this.load.image("myTileset-image", "assets/wall-images.png");
  this.load.image("player", "assets/player-front.png");
  this.load.spritesheet("gamePiece", "player-pieces.png", {
    frameWidth: 60,
    frameHeight: 65,
  });
  this.load.spritesheet("enemyPiece", "enemy-pieces.png", {
    frameWidth: 60,
    frameHeight: 65,
  });

  this.load.tilemapTiledJSON("Gamemap", "map.json");
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
