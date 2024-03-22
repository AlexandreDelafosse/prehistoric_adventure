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
    this.load.spritesheet("houses", "../../assets/houses.png", {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.spritesheet("npc_1", "../../assets/npc_1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
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

    for (let index = 0; index < 4; index++) {
      // rad number between 100 and 500
      let truc = [375, 700, 520, 840];
      let truc2 = [150, 120, 470, 470];
      const x = truc[index];
      const y = truc2[index];
      let house = this.physics.add.sprite(x, y, "houses", index);
      house.setScale(1.25);
      house.width = 200;
      house.height = 200;
      house.setImmovable(true);
      this.physics.add.collider(this.player, house);
    }

    const npc_1 = obstacles({
      name: "npc_1",
      xCoordinates: 200,
      yCoordinates: 200,
      spriteNumber: 0,
    }).create.call(this);
    this.physics.add.collider(this.player, npc_1, () => {
      console.log("collision with npc_1");
    });

    // Définition des collisions avec les obstacles
    // this.obstaclesArray.forEach((obstacle) => {
    //   const obstacleInstance = obstacles(obstacle).create.call(this);
    //   obstacleInstance.position = {
    //     x: obstacle.xCoordinates,
    //     y: obstacle.yCoordinates,
    //   };

    //   // Gestion des collisions avec le joueur
    //   this.physics.add.collider(this.player, obstacleInstance);

    // });

    // Créez un nouvel objet Graphics
    let graphics = this.add.graphics();
    // Définissez le style de ligne (épaisseur, couleur)
    graphics.lineStyle(1, 0xffffff, 0.8);
    // Dessinez une grille
    const sceneScale = 50;
    for (let x = 0; x < this.scale.width; x += sceneScale) {
      for (let y = 0; y < this.scale.height; y += sceneScale) {
        graphics.strokeRect(x, y, sceneScale, sceneScale);
      }
    }

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
