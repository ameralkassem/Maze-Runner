// Create a new Phaser scene
class CustomScene extends Phaser.Scene {
  constructor() {
    super("CustomScene");
  }

  preload() {
    // Load the background image
    this.load.image("background", "assets/images/bg.jpg");
  }

  create() {
    // Add background image
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);

    // Add text
    const text = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 3,
      "Congratulations! You have finished Level One.",
      {
        fontFamily: "Arial",
        fontSize: "32px",
        fill: "#ffffff",
      }
    );
    text.setOrigin(0.5);

    // Add a button
    const button = this.add.text(
        this.game.config.width / 2,
        this.game.config.height / 3 + 60,
        "Proceed to Level Two",
        {
          fontFamily: "Arial",
          fontSize: "24px",
          fill: "#ffffff",
          backgroundColor: "#4287f5",

          padding: {
            left: 10,
            right: 10,
            top: 5,
            bottom: 5,
          }
        }
      ).setOrigin(0.5).setInteractive();

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
