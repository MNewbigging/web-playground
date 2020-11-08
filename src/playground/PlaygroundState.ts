import { action, observable } from 'mobx';

export enum AppState {
  PLAYGROUND,
  WORD_BASH
}

export class PlaygroundState {
  @observable public appState: AppState;


  constructor() {
    this.appState = AppState.PLAYGROUND;
  }

  @action public toApp = (app: AppState) => {
    console.log('app state before ', this.appState);
    this.appState = app;
    console.log('changed app state to: ', this.appState);
  }
}