import { action, observable } from 'mobx';

export enum WBScreen {
  MENU,
  GAME
}

export interface ILetterTile {
  letter: string;
}


export class WordBashState {
  @observable public wbScreen: WBScreen = WBScreen.MENU;
  public letterPool: ILetterTile[] = [];
  private letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  @action public toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }

  @action public startGame() {
    this.prepLetterPool();
    this.toWbScreen(WBScreen.GAME);
  }

  private prepLetterPool() {
    this.letterPool = [];
    this.letters.forEach((l) => {
      this.letterPool.push({
        letter: l
      });
    });
    
  }
}