import Phaser from "./phaser.js";
import { obstacles } from "./sprites/obstacles.js";

class GameComponent extends Phaser.Scene {
  // in this format: {name: "rock_1", type: "rock" xCoordinates: 200, yCoordinates: 300}
  // name can either be "tree_1" or "rock_1"
  // type can either be "tree" or "rock"
  // xCoordinates is between 100 and 700
  // yCoordinates is between 100 and 500

  obstaclesArray = [
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 200,
      yCoordinates: 300,
    },
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 300,
      yCoordinates: 400,
    },
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 400,
      yCoordinates: 500,
    },
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 500,
      yCoordinates: 200,
    },
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 600,
      yCoordinates: 300,
    },
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 700,
      yCoordinates: 400,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 350,
      yCoordinates: 150,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 200,
      yCoordinates: 200,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 300,
      yCoordinates: 300,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 400,
      yCoordinates: 400,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 500,
      yCoordinates: 500,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 600,
      yCoordinates: 100,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 700,
      yCoordinates: 200,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 100,
      yCoordinates: 300,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 200,
      yCoordinates: 400,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 300,
      yCoordinates: 500,
    },
  ];

  preload() {
    this.load.image("player", "../../assets/player.png");
    obstacles({ name: "rock_1" }).preload.call(this);
    obstacles({ name: "tree_1" }).preload.call(this);
  }

  create() {
    this.player = this.physics.add.image(100, 100, "player");
    this.player.setScale(0.1);
    this.player.width = 40;
    this.player.height = 40;
    this.player.setCollideWorldBounds(true);

    this.physics.world.bounds.setTo(0, 0, this.scale.width, this.scale.height);
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    for (let i = 0; i < this.obstaclesArray.length; i++) {
      const obstacle = this.obstaclesArray[i];
      this[obstacle.name + i] = obstacles(obstacle).create.call(this);
      this[obstacle.name + i].position = {
        x: obstacle.xCoordinates,
        y: obstacle.yCoordinates,
      };

      let isKeyPressed = false;
      this.physics.add.collider(this.player, this[obstacle.name + i], () => {
        keyE.on("down", () => {
          if (!isKeyPressed) {
            console.log("this is a ", obstacle.type);
            isKeyPressed = true;
          }
        });
      });
    }
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(300);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(300);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    // if (this.cursors.left.isDown) {
    //   this.player.anims.play("left", true);
    // } else if (this.cursors.right.isDown) {
    //   this.player.anims.play("right", true);
    // } else if (this.cursors.up.isDown) {
    //   this.player.anims.play("up", true);
    // } else if (this.cursors.down.isDown) {
    //   this.player.anims.play("down", true);
    // } else {
    //   this.player.anims.stop();
    // }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [GameComponent],
};

const game = new Phaser.Game(config);
