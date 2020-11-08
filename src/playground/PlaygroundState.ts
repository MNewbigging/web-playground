import {action, observable} from 'mobx';

export enum AppState {
  PLAYGROUND,
  WORD_BASH
}

export class PlaygroundState {
  @observable public appState: AppState = AppState.PLAYGROUND;

  @action toApp(appState: AppState) {
    this.appState = appState;
  }
}