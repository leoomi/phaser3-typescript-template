import 'phaser';
import { Sprite, BoardPositionService } from '@core';
import MainScene from 'scenes/main-scene';

import BoardPieceColor from './board-piece-color';
import { Vector, Query } from 'matter';
import BoardManager from 'game-objects/board-manager';

export default class BoardPiece extends Sprite {

  color: BoardPieceColor;
  boardPosition: Vector;

  private positionService: BoardPositionService;
  private tween: Phaser.Tweens.Tween;

  constructor(scene: MainScene, x: number, y: number, color: BoardPieceColor) {
    super(scene, 0, 0, color);
    this.setOrigin(0, 0);
    this.positionService = BoardPositionService.GetInstance();

    this.boardPosition = { x, y };
    this.color = color;

    const position = this.positionService.convertToCoordinates(x, y);
    this.setPosition(position.x, position.y);

    return;
  }

  move(destination: Vector): void {
    const position = this.positionService.convertToCoordinates(destination.x, destination.y);

    this.scene.tweens.add({
      targets: this,
      x: position.x,
      y: position.y,
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 250,
      repeat: 0
    });
    return;
  }

  isTweenPlaying() {
    return this.tween && this.tween.isPlaying();
  }

  delete() {
    const board = (this.scene as MainScene).boardManager.board;
    board[this.boardPosition.y][this.boardPosition.x] = null;
    this.destroy();
  }
}