import { Vector } from 'matter';

export class BoardPositionService {
  private static instance: BoardPositionService;

  private xOffset: number = 8;
  private yOffset: number = 8;

  private pieceWidth: number = 16;
  private pieceHeight: number = 16;

  static GetInstance() {
    if (!BoardPositionService.instance) {
      BoardPositionService.instance = new this();
    }

    return BoardPositionService.instance;
  }

  convertToCoordinates(x: number, y: number): Vector {
    return {
      x: this.xOffset + x * this.pieceWidth,
      y: this.yOffset + y * this.pieceHeight
    }
  }
}