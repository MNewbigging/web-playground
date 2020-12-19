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
    this.gameState = new MRGameState(3);
    this.mrScreen = MRScreen.GAME;
  }
}
