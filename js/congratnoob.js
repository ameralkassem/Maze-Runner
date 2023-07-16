// Create a new Phaser scene
class CustomScene extends Phaser.Scene {
  constructor() {
    super("CustomScene");
  }

  preload() {
    // Load the background image
    this.load.image("background", "assets/images/bg.png");
  }

  create() {
    // Add background image
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);

    // Add text

    text.setOrigin(0.5);





    // Button event
    button.on("pointerup", () => {
      // Transition to Level Two scene
      this.scene.start("LevelTwoScene");
    });
    button.on("pointerover", function () {
      this.setStyle({ cursor: "pointer" });
    });
  }
}

// Create a new Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  scene: [CustomScene],
};

// Create a new Phaser game
const game = new Phaser.Game(config);
