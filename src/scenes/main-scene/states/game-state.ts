import { State } from '@core';
import MainScene from '../main-scene';

export default class GameState extends State {

  constructor(private scene: MainScene) {
    super();
  }

  onEnter() {
    return;
  }

  onExit() {
    return;
  }

  update() {
    this.scene.cursor.update();
  }
}