import 'phaser';
import MainScene from 'scenes/main-scene';

import BoardBuilder from './board-builder';
import BoardPiece from 'game-objects/board-piece';
import { Vector } from 'matter';
import { BoardPositionService } from '@core';
import MatchChecker from './match-checker';

export default class BoardManager {
  board: BoardPiece[][];
  rows: number;
  cols: number;

  private positionService: BoardPositionService;
  private boardBuilder: BoardBuilder;
  private matchChecker: MatchChecker;

  private swapTimer: Phaser.Time.TimerEvent;

  constructor(private scene: MainScene, rows: number, cols: number) {
    this.positionService = BoardPositionService.GetInstance();
    this.rows = rows;
    this.cols = cols;

    this.matchChecker = new MatchChecker(this);

    this.boardBuilder = new BoardBuilder();
    this.board = this.boardBuilder.buildBoard(this.scene, rows, cols);
    this.printBoard();
    return;
  }

  public swapPieces(fst: Vector, snd: Vector): void {
    if (this.swapTimer && !this.swapTimer.hasDispatched) {
      return;
    }

    const first = this.board[fst.y][fst.x];
    const second = this.board[snd.y][snd.x];

    first.move(snd);
    second.move(fst);

    this.swapTimer = this.scene.time.delayedCall(250,
      this.doSwap, [first, second], this);
  }

  public printBoard() {
    let result: string = '';
    for (let i = 0; i < this.rows; ++i) {
      let row: string = '';
      for (let j = 0; j < this.cols; ++j) {
        row = row + this.board[i][j]?.color + ` ${j} ${i}` + ' ';
      }
      result = result + row + '\n';
    }
    console.log(result);
  }

  private doSwap(f: BoardPiece, s: BoardPiece) {
    this.board[f.boardPosition.y][f.boardPosition.x] = s;
    this.board[s.boardPosition.y][s.boardPosition.x] = f;

    const temp = f.boardPosition;
    f.boardPosition = s.boardPosition;
    s.boardPosition = temp;

    this.matchChecker.checkForMatch(f);
    this.matchChecker.checkForMatch(s);

    this.rearrangeBoard();
  }

  private rearrangeBoard() {
    // Create new pieces
    for (let i = 0; i < this.cols; ++i) {
      this.createNewPieces(i);
    }
    // Do gravity
    // Do check for every piece
    return;
  }

  private createNewPieces(col: number) {
    let countEmpty = 0;
    for (let i = 0; i < this.rows; ++i) {
      countEmpty = countEmpty + (this.board[i][col] ? 0 : 1);
    }

    this.boardBuilder.createNewPiecesForColumn(col, countEmpty);
  }
}