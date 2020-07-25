import 'phaser';
import Config from 'config';
import { StateManager } from '@core';

import GameState from './states/game-state';
import PauseState from './states/pause-state';
import BoardManager from 'game-objects/board-manager';
import BoardPieceColor from 'game-objects/board-piece/board-piece-color'
import BoardCursor from 'game-objects/board-cursor';
import DebugTexts from 'game-objects/debug-texts';

import SwordImage from 'assets/sword.png';
import ShieldImage from 'assets/shield.png';
import StaffImage from 'assets/staff.png';
import SpecialImage from 'assets/special.png';
import CursorImage from 'assets/cursor.png';

export default class MainScene extends Phaser.Scene {
  width: number = Config.scale.height as number;
  height: number = Config.scale.width as number;

  stateManager: StateManager;

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  boardManager: BoardManager;
  cursor: BoardCursor;
  debug: DebugTexts;

  constructor() {
    super('demo');
  }

  preload() {
    // TODO: make a class that loads assets more elegantly
    this.load.image(BoardPieceColor.Sword, SwordImage);
    this.load.image(BoardPieceColor.Shield, ShieldImage);
    this.load.image(BoardPieceColor.Staff, StaffImage);
    this.load.image(BoardPieceColor.Special, SpecialImage);
    this.load.image(BoardCursor.SpriteName, CursorImage)
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.boardManager = new BoardManager(this, 12, 7);
    this.cursor = new BoardCursor(this);

    this.stateManager = new StateManager({
      'game': new GameState(this),
      'pause': new PauseState(this)
    });
    this.stateManager.switchState('game');

    this.debug = new DebugTexts(this);
  }

  update() {
    this.stateManager.update();

    this.debug.update();
  }
}
