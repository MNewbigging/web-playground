import { action, observable } from 'mobx';

export enum AppState {
  PLAYGROUND,
  WORD_BASH,
  DESK_SCENE,
  MEMO_RUNE,
}

export class PlaygroundState {
  @observable public appState: AppState = AppState.PLAYGROUND;

  @action toApp(appState: AppState) {
    this.appState = appState;
  }
}
