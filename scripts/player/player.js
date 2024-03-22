// import Phaser from "phaser";

export const player = () => ({
    preload() {
        this.load.image("player", "../../assets/player.png");
    },
    create() {
        // Création du joueur ici, juste après la configuration des couches et avant de définir les collisions
        this.player = this.physics.add.image(100, 100, "player").setScale(0.1);
        this.player.setCollideWorldBounds(true);
    },
  
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
  });
  