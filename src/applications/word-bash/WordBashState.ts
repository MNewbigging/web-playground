import { action, observable } from 'mobx';

export enum WBScreen {
  MENU,
  GAME
}


export class WordBashState {
  @observable public wbScreen: WBScreen = WBScreen.MENU;

  @action toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }
}