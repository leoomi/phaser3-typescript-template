import 'phaser';
import { Vector } from 'matter';

import { Sprite, Direction, BoardPositionService } from '@core';
import MainScene from 'scenes/main-scene';
import BoardManager from 'game-objects/board-manager';

export default class BoardCursor extends Sprite {
  static SpriteName: string = 'cursor';
  static File: string = 'assets/cursor.png';

  currentPosition: Vector;

  private board: BoardManager;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private moveTween: Phaser.Tweens.Tween;
  private positionService: BoardPositionService;

  constructor(scene: MainScene) {
    super(scene, 0, 0, BoardCursor.SpriteName);
    this.positionService = BoardPositionService.GetInstance();

    const initialPosition = this.positionService.convertToCoordinates(0, 0);
    this.setPosition(initialPosition.x, initialPosition.y);
    this.setOrigin(0, 0);

    this.cursorKeys = scene.cursorKeys;
    this.board = scene.boardManager;
    this.currentPosition = { x: 0, y: 0 };

    return;
  }

  update() {
    if (this.cursorKeys.space.isDown) {
      console.log('space ');
      const firstPosition = this.currentPosition;
      const secondPosition = { x: this.currentPosition.x + 1, y: this.currentPosition.y };

      this.board.swapPieces(firstPosition, secondPosition);
    }

    if (this.cursorKeys.right.isDown) {
      this.move(Direction.Right);
    } else if (this.cursorKeys.left.isDown) {
      this.move(Direction.Left);
    }

    if (this.cursorKeys.up.isDown) {
      this.move(Direction.Up);
    } else if (this.cursorKeys.down.isDown) {
      this.move(Direction.Down);
    }
  }

  private move(direction: Direction): void {
    if (this.moveTween && this.moveTween.isPlaying()) {
      return;
    }

    switch (direction) {
      case Direction.Right:
        if (this.currentPosition.x + 2 >= this.board.cols) {
          return;
        }

        this.currentPosition.x = this.currentPosition.x + 1;

        this.doMoveTween();
        break;
      case Direction.Left:
        if (this.currentPosition.x === 0) {
          return;
        }

        this.currentPosition.x = this.currentPosition.x - 1;

        this.doMoveTween();
        break;
      case Direction.Down:
        if (this.currentPosition.y + 1 >= this.board.rows) {
          return;
        }

        this.currentPosition.y = this.currentPosition.y + 1;

        this.doMoveTween();
        break;
      case Direction.Up:
        if (this.currentPosition.y === 0) {
          return;
        }

        this.currentPosition.y = this.currentPosition.y - 1;

        this.doMoveTween();
        break;
    }

    return;
  }

  private doMoveTween() {
    const position = this.positionService.convertToCoordinates(this.currentPosition.x, this.currentPosition.y);

    this.moveTween = this.scene.tweens.add({
      targets: this,
      x: position.x,
      y: position.y,
      ease: 'Elastic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 100,
      repeat: 0
    });
  }
}