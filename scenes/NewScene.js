import Phaser from "/phaser.js";

class NewScene extends Phaser.Scene {
    constructor() {
        super('NewScene');
    }
  
    create() {
        this.add.text(20, 20, 'Loading..');

        // Initialisation de l'objet cursors pour capter les entrées du clavier
        this.cursors = this.input.keyboard.createCursorKeys();

        setTimeout(() => {
            this.scene.start('GameScene'); // Utilisez le nom de votre scène de jeu principale ici si différent
        }, 2000);
    }

    update() {
        // Si la touche de gauche est pressée, retournez à la scène de jeu principale
        if (this.cursors.left.isDown) {
            this.scene.start('GameScene'); // Assurez-vous que 'GameScene' est le nom correct de votre scène principale
        }
    }
}

export default NewScene;
