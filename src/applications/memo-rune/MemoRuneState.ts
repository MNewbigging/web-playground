import { MRGameState } from './MRGameState';

import { action, observable } from 'mobx';

export enum MRScreen {
  MENU,
  GAME,
}

export class MemoRuneState {
  @observable public mrScreen: MRScreen = MRScreen.MENU;
  private gameState?: MRGameState;

  @action startGame() {
    this.mrScreen = MRScreen.GAME;
  }
}
