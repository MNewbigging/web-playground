import { observable } from 'mobx';

export enum C4GameState {
  CHAR_SELECT,
  GAME,
}

export class ConnectFourState {
  @observable public gameState: C4GameState = C4GameState.CHAR_SELECT;
}
