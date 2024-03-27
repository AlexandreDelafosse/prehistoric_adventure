import Phaser from "./phaser.js";
import NewScene from "./scenes/NewScene.js";
import { obstacles } from "./sprites/obstacles.js";
import { player } from "./scripts/player/player.js"

class GameComponent extends Phaser.Scene {

  obstaclesArray = [
    {
      name: "rock_1",
      type: "rock",
      xCoordinates: 200,
      yCoordinates: 300,
    },
    {
      name: "tree_1",
      type: "tree",
      xCoordinates: 350,
      yCoordinates: 150,
    },
  ];

  
  preload() {
    this.load.tilemapTiledJSON('map', '../../assets/testmap.json'); 
    player({ name: "player"}).preload.call(this);
    obstacles({ name: "rock_1" }).preload.call(this);
    obstacles({ name: "tree_1" }).preload.call(this);
    // Assurez-vous que les chemins vers les images des tilesets sont corrects
    this.load.image('summer', '../../assets/summer.png');
    this.load.image('houses', '../../assets/houses.png');
  }

  create() {    // Création du joueur
      const map = this.make.tilemap({ key: 'map' });
      const tilesetSummer = map.addTilesetImage('summer', 'summer');
      const tilesetHouses = map.addTilesetImage('houses', 'houses');
  
      const layerFond = map.createLayer('fond', tilesetSummer, 0, 0);
      const layerMaison = map.createLayer('maison', tilesetHouses, 0, 0);
      const layerbush = map.createLayer('bushs', tilesetSummer, 0, 0);
  
      const playerInstance = player(player).create.call(this);
  
      layerMaison.setCollisionByProperty({ collision: true });
      this.physics.add.collider(this.player, layerMaison);
      
      layerbush.setCollisionByProperty({ collision: true });
      this.physics.add.collider(this.player, layerbush);
  

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
    const playerInstance = player(player).update.call(this);
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
const game = new Phaser.Game(config);