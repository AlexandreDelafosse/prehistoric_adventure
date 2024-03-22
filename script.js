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
    this.load.image("background", "assets/background.png");
  }

  create() {
    // Ajout du fond d'écran
    this.background = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setDisplaySize(window.innerWidth, window.innerHeight);

    // Création du joueur
    this.player = this.physics.add.image(100, 100, "player").setScale(0.1);
    this.player.setCollideWorldBounds(true);

    // Définition des collisions avec les obstacles
    this.obstaclesArray.forEach(obstacle => {
      const obstacleInstance = obstacles(obstacle).create.call(this);
      obstacleInstance.position = {
        x: obstacle.xCoordinates,
        y: obstacle.yCoordinates,
      };

      // Gestion des collisions avec le joueur
      this.physics.add.collider(this.player, obstacleInstance);
    });

    // Gestion des contrôles de déplacement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Déplacement horizontal
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(300);
    }

    // Déplacement vertical
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(300);
    }
  }
}

// Configuration du jeu
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [GameComponent],
};

// Création de l'instance du jeu
const game = new Phaser.Game(config);