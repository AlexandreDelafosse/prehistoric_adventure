import { Component } from '@angular/core';
import { Scene } from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent extends Scene {
  private player: Phaser.GameObjects.Sprite | undefined;

  constructor() {
    super({ key: 'GameComponent' });
  }

  preload() {
    this.load.image('player', 'src/assets/player.png');
  }

  create() {
    this.player = this.add.sprite(100, 100, 'player');
    this.player.setInteractive();
    this.player.on('pointerdown', this.onPlayerClick, this);
  }

  override update(time: number, delta: number) {
    // Mettre à jour la scène à chaque frame
  }

  private onPlayerClick() {
    console.log('Le joueur a été cliqué !');
  }

  ngOnInit() {
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameComponent],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {x:0, y: 200 },
    },
  },
};

const game = new Phaser.Game(config);