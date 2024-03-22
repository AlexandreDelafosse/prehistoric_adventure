import Phaser from "./phaser.js";
import { obstacles } from "./sprites/obstacles.js";
import { speechBox } from "./components/speechBox.js";

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
    this.load.spritesheet("npc_2", "../../assets/npc_2.png", {
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
    this.cursors = this.input.keyboard.createCursorKeys();
    var keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    for (let index = 0; index < 4; index++) {
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
      type: "npc",
      xCoordinates: 520,
      yCoordinates: 320,
      spriteNumber: 0,
    }).create.call(this);

    const npc_2 = obstacles({
      name: "npc_2",
      type: "npc",
      xCoordinates: 220,
      yCoordinates: 320,
      spriteNumber: 0,
    }).create.call(this);

    let isKeyPressed = false;
    let currentNPC = null;
    this.physics.add.collider(this.player, npc_1, () => {
      currentNPC = npc_1;
    });
    this.physics.add.collider(this.player, npc_2, () => {
      currentNPC = npc_2;
    });

    keyE.on("down", () => {
      if (!isKeyPressed && currentNPC) {
        isKeyPressed = true;
        if (currentNPC === npc_1) {
          speechBox("Hello there !", npc_1).create.call(this);

          const choices = ["General Kenobi", "Hi!"];
          speechBox("Choose an option:", npc_1).create.call(this);
          choices.forEach((choice, index) => {
            const text = this.add.text(
              npc_1.x,
              npc_1.y + 20 * (index + 1),
              choice,
              {
                fontSize: "16px",
                color: "#000000",
                backgroundColor: "#ffffff",
                padding: {
                  x: 10,
                  y: 5,
                },
              }
            );
            text.setInteractive();
            text.on("pointerdown", () => {
              // Handle the choice here
              if (index === 0) {
                speechBox("You are a bold one", npc_1).create.call(this);
              } else if (index === 1) {
                console.log("Hi!");
                game.scene.destroy();
                game.scene.stop();
              }
              text.destroy();
              // speechBox("", npc_1).destroy.call(this);
            });
          });
        } else if (currentNPC === npc_2) {
          speechBox("Hey! you're finaly awake ...", npc_2).create.call(this);
        }
        setTimeout(() => {
          isKeyPressed = false;
        }, 2000);
        console.log(isKeyPressed);
      }
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
