import { MRGameState } from './MRGameState';

import { action, observable } from 'mobx';

export enum MRScreen {
  MENU,
  GAME,
}

export enum MRPairCount {
  XL = 16,
  L = 14,
  M = 12,
  S = 10,
  XS = 8,
}

export class MemoRuneState {
  @observable public mrScreen: MRScreen = MRScreen.MENU;
  @observable.ref public gameState?: MRGameState;
  @observable public gameSize = MRPairCount.M;

  @action startGame(playerCount: number) {
    this.gameState = new MRGameState(this.gameSize, playerCount);
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

  @action setGameSize(size: number) {
    this.gameSize = size;
  }
}
