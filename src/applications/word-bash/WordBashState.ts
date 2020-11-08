import { action, observable } from 'mobx';

export enum WBScreen {
  MENU,
  GAME,
}

export enum LetterTileStatus {
  INACTIVE = 'inactive',
  NORMAL = 'normal',
  ACTIVE = 'active',
}

export interface ILetterTile {
  letter: string;
  status: LetterTileStatus;
}

export class WordBashState {
  @observable public wbScreen: WBScreen = WBScreen.MENU;
  @observable public letterPool: ILetterTile[] = [];
  private letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  @action public toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }

  @action public startGame() {
    this.prepLetterPool();
    this.toWbScreen(WBScreen.GAME);
  }

  public pressKey(key: string) {
    // Check for standard behaviour keys first (backspace, enter etc)

    // Only valid if letter exists in normal state
    const validLetter = this.letterPool.findIndex(
      (l) => l.letter.toLowerCase() === key.toLowerCase() && l.status === LetterTileStatus.NORMAL
    );
    if (validLetter >= 0) {
      this.letterPool[validLetter].status = LetterTileStatus.ACTIVE;
    }
  }

  private undoLastLetter() {
    // on backspace, remove last activated letter
  }

  private prepLetterPool() {
    this.letterPool = [];
    this.letters.forEach((l) => {
      this.letterPool.push({
        letter: l,
        status: LetterTileStatus.NORMAL,
      });
    });
  }
}
