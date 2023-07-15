let gameScene = new Phaser.Scene("Game");
gameScene.preload = function() {
    this.load.image("wall-image","assets/wall-images.png");
    this.load.image("player","assets/player-front.png");
    this.load.image("cup","assets/cup.png");
    this.load.spritesheet("gamepieces","assets/player-pieces.png", {
        frameWidth : 60,
        frameHeight : 65
    })
    this.load.tilemapTiledJSON("wallmap","game.json");
};
gameScene.create = function() {
    const map = this.make.tilemap({key : "wallmap"});
    const tileset = map.addTilesetImage("map","wall-image");
    const floor_layer = map.createLayer("floor",tileset,0,0);
    const grass_layer = map.createLayer("grass",tileset,0,0);
    floor_layer.setCollisionByExclusion(-1,true);

    this.player = this.physics.add.sprite(0,20,"player");
    this.player.setBounce(0,1);
    this.player.setCollideWorldBounds(true);
    //this.player.body.allowGravity = false;
    this.physics.add.collider(this.player,floor_layer);
    this.se_cup = this.physics.add.sprite(1250,750,"cup");
    this.se_cup.setImmovable(true);
    this.se_cup.setScale(0.2,0.18);
    this.se_cup.setCollideWorldBounds(true);

    this.physics.add.collider(this.player,this.se_cup,this.nextLevel,null,this);
    this.physics.add.collider(this.se_cup,floor_layer);
    

    this.anims.create({
        key : "left",
        frames: this.anims.generateFrameNumbers("gamepieces", {
            start: 7,
            end: 4,
        }),
        frameRate: 10,
        repeat : -1,
    });

    this.anims.create({
        key : "right",
        frames : this.anims.generateFrameNumbers("gamepieces", {
            start : 8,
            end : 11,
        }),
        frameRate : 10,
        repeat : -1,
    });

    this.anims.create({
        key : "down",
        frames : this.anims.generateFrameNumbers("gamepieces", {
            start : 0,
            end : 4,
        }),
        frameRate : 10,
        repeat : -1,
    });

    this.anims.create({
        key : "stop",
        frames : this.anims.generateFrameNumbers("gamepieces",{
            start : 0,
            end : 0,
        }),
        frameRate : 10,
        repeat : -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
};
gameScene.update = function() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
        if (this.player.body.onFloor()) {
            this.player.anims.play("left",true);
        }
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
        if (this.player.body.onFloor()) {
            this.player.anims.play("right",true);
        }
    } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
    
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(200);
        this.player.anims.play("down",true);
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
};
gameScene.nextLevel = function() {
    this.scene.stop();
    this.scene.start("NextLevelScene");
}

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