import BoardManager from './board-manager';
import BoardPiece from 'game-objects/board-piece';

export default class MatchChecker {
  constructor(private boardManager: BoardManager) {

  }

  checkForMatch(piece: BoardPiece) {
    // Horizontal
    const board = this.boardManager.board;
    const position = piece.boardPosition;
    const horizontalPiecesToDelete: BoardPiece[] = [ piece ];

    // Right
    if (position.x < this.boardManager.cols - 1) {
      let pivot = position.x + 1;
      let currentPiece = board[position.y][pivot];

      while (currentPiece && currentPiece.color === piece.color) {
        console.log(currentPiece.color);
        horizontalPiecesToDelete.push(currentPiece);
        pivot = pivot + 1;

        if (pivot >= this.boardManager.cols) break;
        currentPiece = board[position.y][pivot];
      }
    }

    // Left
    if (position.x > 0) {
      let pivot = position.x - 1;
      let currentPiece = board[position.y][pivot];

      while (currentPiece && currentPiece.color === piece.color) {
        console.log(currentPiece.color);
        horizontalPiecesToDelete.push(currentPiece);
        pivot = pivot - 1;

        if (pivot < 0) break;
        currentPiece = board[position.y][pivot];
      }
    }

    if (horizontalPiecesToDelete.length > 2) {
      console.log('noice');
      horizontalPiecesToDelete.forEach(p => p.delete());
    }

    const verticalPiecesToDelete: BoardPiece[] = [ piece ];
    // Down
    if (position.y < this.boardManager.rows - 1) {
      let pivot = position.y + 1;
      let currentPiece = board[pivot][position.x];

      while (currentPiece && currentPiece.color === piece.color) {
        console.log(currentPiece.color);
        verticalPiecesToDelete.push(currentPiece);
        pivot = pivot + 1;

        if (pivot >= this.boardManager.rows) break;
        currentPiece = board[pivot][position.x];
      }
    }

    // Up
    if (position.y > 0) {
      let pivot = position.y - 1;
      let currentPiece = board[pivot][position.x];

      while (currentPiece && currentPiece.color === piece.color) {
        console.log(currentPiece.color);
        verticalPiecesToDelete.push(currentPiece);
        pivot = pivot - 1;

        if (pivot < 0) break;
        currentPiece = board[pivot][position.x];
      }
    }

    if (verticalPiecesToDelete.length > 2) {
      console.log('noice');
      verticalPiecesToDelete.forEach(p => p.delete());
    }

    this.boardManager.printBoard();
  }
}