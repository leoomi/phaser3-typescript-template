import { State } from './state';

export class StateManager {
  private states: { [key: string]: State};
  private currentState: State;

  constructor(states?: { [key: string]: State}) {
    this.states = states;

    return;
  }

  update(): void {
    this.currentState.update();
  }

  switchState(key: string): void {
    if (!(key in this.states)) {
      console.error('state not found');
      return;
    }

    this.currentState?.onExit();
    this.currentState = this.states[key];
    this.currentState.onEnter();
  }
}
