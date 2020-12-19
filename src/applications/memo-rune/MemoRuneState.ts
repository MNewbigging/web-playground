import { MRGameState } from './MRGameState';

import { action, observable } from 'mobx';

export enum MRScreen {
  MENU,
  GAME,
}

export class MemoRuneState {
  @observable public mrScreen: MRScreen = MRScreen.MENU;
  @observable.ref public gameState?: MRGameState;

  @action startGame() {
    this.gameState = new MRGameState(32);
    this.mrScreen = MRScreen.GAME;
  }

  @action pauseGame() {
    this.mrScreen = MRScreen.MENU;
  }

  @action resumeGame() {
    this.mrScreen = MRScreen.GAME;
  }

  @action endGame() {
    this.gameState = undefined;
  }
}
