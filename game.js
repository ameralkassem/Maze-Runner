const config = {

  width: 640,
  height: 360,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);


function preload() {
  this.load.image('wall', 'wall.jpg');
  this.load.image('background', 'backgroundimg.png');

}

function create() {
  const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  backgroundImage.displayWidth = 640;
  backgroundImage.displayHeight = 360;

  const wallGraphics = this.add.graphics();
  wallGraphics.fillStyle(0x000000);

  //  here i'm defining the position of each and every wall
  const walls = [
    { x: 50, y: 0, width: 640, height: 40 }, // Wall 1
    { x: 0, y: 90, width: 40, height: 10 }, // Wall 2
    { x: 0, y: 100, width: 10, height: 260 }, // Wall 3
    { x: 200, y: 40, width: 10, height: 150 }, // Wall 4
    { x: 450, y: 40, width: 10, height: 50 }, // Wall 5
    { x: 630, y: 40, width: 10, height: 450 }, // Wall 6
    { x: 0, y: 350, width: 580, height: 10 }, // Wall 7
    { x: 100, y: 180, width: 130, height: 10 }, // Wall 8
    { x: 100, y: 130, width: 50, height: 10 }, // Wall 9
    { x: 0, y: 230, width: 50, height: 10 }, // Wall 11
    { x: 100, y: 280, width: 85, height: 10 }, // Wall 12
    { x: 130, y: 180, width: 10, height: 60 }, // Wall 13
    { x: 230, y: 180, width: 10, height: 60 }, // Wall 14
    { x: 180, y: 230, width: 50, height: 10 }, // Wall 15
    { x: 180, y: 240, width: 10, height: 50 }, // Wall 16
    { x: 270, y: 290, width: 10, height: 60 }, // Wall 17
    { x: 355, y: 290, width: 100, height: 10 }, // Wall 19
    { x: 350, y: 240, width: 10, height: 60 }, // Wall 20
    { x: 450, y: 240, width: 10, height: 60 }, // Wall 21
    { x: 530, y: 300, width: 100, height: 10 }, // Wall 22
    { x: 580, y: 200, width: 100, height: 10 }, // Wall 23
    { x: 570, y: 200, width: 10, height: 60 }, // Wall 24
    { x: 420, y: 230, width: 80, height: 10 }, // Wall 25
    { x: 410, y: 180, width: 10, height: 60 }, // Wall 26
    { x: 490, y: 140, width: 10, height: 100 }, // Wall 27
    { x: 340, y: 170, width: 80, height: 10 }, // Wall 28
    { x: 340, y: 100, width: 10, height: 70 }, // Wall 29
    { x: 300, y: 100, width: 80, height: 10 }, // Wall 30
    { x: 240, y: 220, width: 40, height: 10 }, // Wall 31
    { x: 310, y: 280, width: 40, height: 10 }, // Wall 32
    { x: 270, y: 160, width: 40, height: 10 }, // Wall 33
    { x: 210, y: 120, width: 40, height: 10 }, // Wall 34
    { x: 450, y: 130, width: 70, height: 10 }, // Wall 35
    { x: 440, y: 130, width: 10, height: 70 }, // Wall 36

  ];

  // Draw walls using graphics
  walls.forEach(wall => {
    const wallImage = this.add.image(wall.x, wall.y, 'wall');
    wallImage.setOrigin(0, 0);
    wallImage.displayWidth = wall.width + 20;
    wallImage.displayHeight = wall.height;
  });

}


function update() {
}
