let gameScene_level2 = new Phaser.Scene("Game");

gameScene_level2.score = 0;
let timeLimit = 90000;
let timeText;
let gameOverText;

gameScene_level2.preload = function () {
    this.load.image("wall-image", "assets/images/maptaler.png");
    this.load.image("coin", "assets/images/star.png");
    this.load.audio("coinSound", "assets/sounds/collect-star.mp3");
    this.load.image("player", "assets/images/frontsprite.png");
    this.load.image("cup", "assets/images/cup.png");
    this.load.spritesheet("gamepieces", "assets/images/allsprite.png", {
        frameWidth: 60,
        frameHeight: 65
    })
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
    this.player.setScale(0.8);
    this.player.setCollideWorldBounds(true);
    this.player.body.gravity.y = 500;
    this.physics.add.collider(this.player, floor_layer);
    this.physics.add.collider(this.coins, floor_layer);
    this.se_cup = this.physics.add.sprite(1250, 750, "cup");
    this.se_cup.setImmovable(true);
    this.se_cup.setScale(0.2, 0.18);
    this.se_cup.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.se_cup, this.nextLevel, null, this);
    this.physics.add.collider(this.se_cup, floor_layer);

    gameScene_level2.scoreText = this.add.text(16, 15, 'Score: 0',
        {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: 3
        });
    
    timeText = this.add.text(200, 15, 'Time: ' + formatTime(timeLimit), {
        fontSize: '32px',
        fill: '#ffffff',
        backgroundColor: '#000000'
        });

    gameOverText = this.add.text(400, 350, '', {
            fontSize: '72px',
            fill: '#ff0000'
        });


    this.time.addEvent({
        delay: 1000,
        callback: function () {
            timeLimit -= 1000;
            if (timeLimit < 0) {
                timeLimit = 0;
            }
            timeText.setText('Time: ' + formatTime(timeLimit));

            if (timeLimit <= 0) {
                gameOverText.setText('Game Over, NOOB!');
            }
        },
        callbackScope: this,
        loop: true
    });

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("gamepieces", {
            start: 7,
            end: 4,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("gamepieces", {
            start: 8,
            end: 11,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("gamepieces", {
            start: 0,
            end: 4,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "stop",
        frames: this.anims.generateFrameNumbers("gamepieces", {
            start: 0,
            end: 0,
        }),
        frameRate: 10,
        repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
};

gameScene_level2.createCoins = function () {
    this.coins = this.physics.add.group();

    const coinPositions = [
        { x : 500, y: 20},
        { x : 1200, y: 100},
        { x : 500, y : 700},
        { x : 500, y : 500 },
        { x: 100, y: 320 },
        { x: 390, y: 220 },
        { x: 630, y: 300 },
        { x : 890, y: 600},
        { x: 890, y: 170 },
    ];

    coinPositions.forEach((position) => {
        const coin = this.coins.create(position.x, position.y, "coin");
        coin.setBounce(Phaser.Math.FloatBetween(0.5, 0.8));
        coin.setDisplaySize(50, 50);
    });

};



gameScene_level2.update = function () {
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
        this.player.anims.play("down", true);
    } else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.stop();
    }
    if (
        Math.abs(this.player.x - this.destinationX) < 5 &&
        Math.abs(this.player.y - this.destinationY) < 5
    ) {
        this.nextLevel();
    }

    this.physics.overlap(this.player, this.coins, this.collectCoin, null, this);


    gameScene_level2.collectCoin = function (player, coin) {
        let coin_arr = [{x : 500, y : 100}]
        this.sound.play("coinSound");
        this.score += 1;
        this.scoreText.setText("Score: " + this.score);


        coin.disableBody(true, true);

    };


};
gameScene_level2.nextLevel = function () {
    this.scene.stop();
    this.scene.start("NextLevelScene");
}
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
    scene: gameScene_level2
};

const game = new Phaser.Game(config);