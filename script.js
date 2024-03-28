import Phaser from "./phaser.js";
import NewScene from "./scenes/NewScene.js";
import { obstacles } from "./sprites/obstacles.js";
import { npcs } from "./sprites/npcs.js";
import { speechBox } from "./components/speechBox.js";
import { player } from "./scripts/player/player.js"

class GameComponent extends Phaser.Scene {

  // obstaclesArray = [
  //   {
  //     name: "rock_1",
  //     type: "rock",
  //     xCoordinates: 200,
  //     yCoordinates: 300,
  //   },
  //   {
  //     name: "tree_1",
  //     type: "tree",
  //     xCoordinates: 350,
  //     yCoordinates: 150,
  //   },
  // ];

  preload() {
    // Load the map
    this.load.tilemapTiledJSON('map', '../../assets/testmap.json');

    // Load the images for the map
    this.load.image('summer', '../../assets/summer.png');
    this.load.image('houses', '../../assets/houses.png');

    // Load the player and the npcs
    player({ name: "player" }).preload.call(this);
    this.load.spritesheet("npc_1", "../../assets/npc_1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npc_2", "../../assets/npc_2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // obstacles({ name: "rock_1" }).preload.call(this);
    // obstacles({ name: "tree_1" }).preload.call(this);
  }

  create() {
    // Creation of the map and its layers
    const map = this.make.tilemap({ key: 'map' });
    const tilesetSummer = map.addTilesetImage('summer', 'summer');
    const tilesetHouses = map.addTilesetImage('houses', 'houses');

    const layerFond = map.createLayer('fond', tilesetSummer, 0, 0);
    const layerMaison = map.createLayer('maison', tilesetHouses, 0, 0);
    const layerBush = map.createLayer('bushs', tilesetSummer, 0, 0);

    // Creation of the player
    player(player).create.call(this);

    // Add collision between player and obstacles
    layerMaison.setCollisionByProperty({ collision: true });
    this.physics.add.collider(this.player, layerMaison);

    layerBush.setCollisionByProperty({ collision: true });
    this.physics.add.collider(this.player, layerBush);

    // Creation of the npcs
    const npc_1 = npcs({
      name: "npc_1",
      type: "npc",
      xCoordinates: 700,
      yCoordinates: 300,
      spriteNumber: 0,
    }).create.call(this);
    const npc_2 = npcs({
      name: "npc_2",
      type: "npc",
      xCoordinates: 220,
      yCoordinates: 320,
      spriteNumber: 0,
    }).create.call(this);

    // Add collision between player and npcs
    let currentNPC = null;
    this.physics.add.collider(this.player, npc_1, () => {
      currentNPC = npc_1;
    });
    this.physics.add.collider(this.player, npc_2, () => {
      currentNPC = npc_2;
    });

    // Add interaction to the player with npcs
    // using the E key
    let isKeyPressed = false;
    var keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Define the interaction with the npcs
    // when the E key is pressed
    keyE.on("down", () => {
      if (!isKeyPressed && currentNPC) {
        isKeyPressed = true;

        // The player will be able to answer to the npc with choices
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

    //
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    player(player).update.call(this);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [GameComponent, NewScene], // Ajoutez NewScene ici
};

// Création de l'instance du jeu
const game = new Phaser.Game(config);
