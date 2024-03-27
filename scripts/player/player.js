// import Phaser from "phaser";

export const player = () => ({
    preload() {
        this.load.spritesheet('player', '../../assets/sprite-sheet.png', {
            frameWidth: 32, // La largeur d'un cadre d'animation
            frameHeight: 32, // La hauteur d'un cadre d'animation
        });
    },
    create() {
        this.player = this.physics.add.sprite(50, 50, 'player').setScale(0.9);
        this.player.setCollideWorldBounds(true);
    
        // Création des animations
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }), // Assurez-vous que ces numéros de frame correspondent à votre spritesheet
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }), // Assurez-vous que ces numéros de frame correspondent à votre spritesheet
            frameRate: 10,
            repeat: -1
        });        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }), // Assurez-vous que ces numéros de frame correspondent à votre spritesheet
            frameRate: 10,
            repeat: -1
        });        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }), // Assurez-vous que ces numéros de frame correspondent à votre spritesheet
            frameRate: 10,
            repeat: -1
        });
    },
    
  
    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true); // Joue l'animation 'left'
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
             this.player.anims.play('right', true); // Jouez l'animation 'right' ici
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop(); // Arrête l'animation quand le joueur ne se déplace pas
        }
    
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true); // Jouez l'animation 'up' ici
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true); // Jouez l'animation 'down' ici
        } else {
            this.player.setVelocityY(0);
            // Pas besoin de stopper l'animation ici si elle est déjà arrêtée dans la section horizontale
        }
      
        // Changement de scène lorsque le joueur atteint le bord droit
        const edgeRight = this.sys.game.config.width;
        if (this.player.x >= edgeRight - this.player.width * this.player.scaleX) { // Ajustez en fonction de la taille et de l'échelle du joueur
          this.scene.start('NewScene');
        }
      }
      
  });
  