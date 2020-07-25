import MainScene from 'scenes/main-scene';

import BoardPiece from '../board-piece';
import BoardPieceColor from '../board-piece/board-piece-color';

export default class BoardBuilder {

   buildBoard(scene: MainScene, rows: number, cols: number): BoardPiece[][] {
      const board: BoardPiece[][] = [];

      for (let i = 0; i < rows; ++i) {
        const row: BoardPiece[] = [];
        board.push(row);

        for (let j = 0; j < cols; ++j) {
          let color: BoardPieceColor = null;

          do {
            color = BoardPieceColor[this.getRandomColorKey()];
          } while (!this.checkMatches(board, j, i, color))

          const piece: BoardPiece = new BoardPiece(scene, j, i, color);

          row.push(piece);
        }
      }

    return board;
  }

  createNewPiecesForColumn(col: number, quantity: number) {
    let createdCount = 0;
  }

  private getRandomColorKey() {
    const keys = Object.keys(BoardPieceColor);
    const length = keys.length;

    return keys[Phaser.Math.Between(0, length - 1)];
  }

  private checkMatches(board: BoardPiece[][], x: number, y: number, color: BoardPieceColor) {
    if (x > 1) {
      if (board[y][x - 2].color === color && board[y][x - 1].color === color) {
        return false;
      }
    }

    if (y > 1) {
      if (board[y - 1][x].color === color && board[y - 2][x].color === color) {
        return false;
      }
    }

    return true;
  }
}