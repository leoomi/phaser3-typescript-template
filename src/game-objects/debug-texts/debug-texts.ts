import MainScene from 'scenes/main-scene';
import Config from 'config';
import BoardCursor from 'game-objects/board-cursor';

export default class DebugTexts {
  private positionText: Phaser.GameObjects.Text;
  private cursor: BoardCursor;
  private fontStyle = {
    fontFamily: 'dogica',
    fontSize: '8px'
  };

  constructor(private scene: MainScene) {
    this.positionText = this.scene.add.text(Config.scale.width as number - 64, 16, '', this.fontStyle);
    this.cursor = this.scene.cursor;
  }

  update(): void {
    this.positionText.setText(`x: ${this.cursor.currentPosition.x} y: ${this.cursor.currentPosition.y}`);
    this.positionText.setStyle(this.fontStyle);
  }
}