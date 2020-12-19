import { action, observable } from 'mobx';

import { PoolSize, WBScreen } from './fixed';
import { ConsonantsWeight } from './LetterGenerator';
import { WBGameState } from './WBGameState';

export class WordBashState {
  @observable public wbScreen: WBScreen = WBScreen.MENU; // which app screen is shown
  public gameState?: WBGameState; // holds currently active game (if there is one started)
  @observable public pausedGame: boolean = false;

  // Letter generation values
  @observable public gameSize: number = PoolSize.MEDIUM;

  private weight: ConsonantsWeight = {
    common: 3,
    uncommon: 2,
    rare: 1,
  };

  @action public setGameSize(poolSize: number) {
    this.gameSize = poolSize;
  }

  @action public startGame() {
    this.gameState = new WBGameState(this.gameSize, this.weight);
    this.toWbScreen(WBScreen.GAME);
  }

  @action public pauseGame = () => {
    this.pausedGame = true;
    this.toWbScreen(WBScreen.MENU);
  };

  @action public resumeGame() {
    this.pausedGame = false;
    this.toWbScreen(WBScreen.GAME);
  }

  @action public endGame() {
    this.pausedGame = false;
    this.toWbScreen(WBScreen.MENU);
  }

  // Called on every key press in game
  @action public pressKey(key: string) {
    switch (this.wbScreen) {
      case WBScreen.GAME:
        // Game specific input
        this.gameState?.pressKey(key);
        break;
      case WBScreen.MENU:
        // Menu specific input
        break;
    }
  }

  @action public toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }
}
