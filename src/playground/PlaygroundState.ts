import { action, observable } from 'mobx';

export enum AppState {
  PLAYGROUND,
  WORD_BASH,
  DESK_SCENE,
  MEMO_RUNE,
  CONNECT_FOUR,
  TASK_LOG,
}

export class PlaygroundState {
  @observable public appState: AppState = AppState.PLAYGROUND;

  @action toApp(appState: AppState) {
    this.appState = appState;
  }
}
