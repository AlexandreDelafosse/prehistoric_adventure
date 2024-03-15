import { Component } from '@angular/core';
import { Scene } from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent extends Scene {
  private player: Phaser.GameObjects.Image | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super({ key: 'GameComponent' });
  }

  preload() {
    this.load.image('player', '../../assets/player.png');
  }

  create() {
    this.player = this.add.sprite(100, 100, 'player');
    this.player.setScale(0.1);
    this.player.setSize(32, 24);
    this.physics.world.bounds.setTo(0, 0, this.scale.width, this.scale.height);
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  override update(time: number, delta: number) {
    if (!this.player || !this.cursors) return;

    const speed = 10;
    if (this.cursors.up.isDown && this.player.y > this.player.height / 2) {
      this.player.y -= speed;
    } else if (this.cursors.down.isDown && this.player.y < this.scale.height - this.player.height / 2) {
      this.player.y += speed;
    }
    if (this.cursors.left.isDown && this.player.x > this.player.width / 2) {
      this.player.x -= speed;
    } else if (this.cursors.right.isDown && this.player.x < this.scale.width - this.player.width / 2) {
      this.player.x += speed;
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
    }
  },
  scene: [GameComponent],
};

const game = new Phaser.Game(config);
