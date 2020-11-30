import { action, observable } from 'mobx';

import { WBScreen } from './fixed';
import { ConsonantsWeight } from './LetterGenerator';
import { WBGameState } from './WBGameState';

export class WordBashState {
  @observable public wbScreen: WBScreen = WBScreen.MENU; // which app screen is shown
  public gameState?: WBGameState; // holds currently active game (if there is one started)
  @observable public pausedGame: boolean = false;

  // Letter generation values
  private readonly letterPoolSize: number = 40;
  private weight: ConsonantsWeight = {
    common: 3,
    uncommon: 2,
    rare: 1,
  };

  @action public startGame() {
    this.gameState = new WBGameState(this.letterPoolSize, this.weight);
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

  @action private toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }
}
