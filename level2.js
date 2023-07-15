let gameScene = new Phaser.Scene("Game");
const config = {
    type : Phaser.AUTO,
    width : 1280,
    height : 800,
    physics : {
        default : "arcade",
        arcade : {
            gravity : {y : 200},
            debug : false,
        },
    },
    scene : gameScene
};

const game = new Phaser.Game(config);