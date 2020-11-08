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
  @observable public letterPool: ILetterTile[] = []; // current letters in play
  @observable public lastPickedLetters: number[] = []; // stores picked letters as indices into letter pool
  private letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  @action public toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }

  @action public startGame() {
    this.prepLetterPool();
    this.toWbScreen(WBScreen.GAME);
  }

  @action public pressKey(key: string) {
    switch (key) {
      case 'Backspace':
        this.undoLastLetter();
        break;
      case 'Enter':
        this.checkWord();
        break;
      default:
        this.checkKeyCharacter(key);
        break;
    }
  }

  private checkKeyCharacter(key: string) {
    // Only valid if letter exists in normal state
    const validLetter = this.letterPool.findIndex(
      (l) => l.letter.toLowerCase() === key.toLowerCase() && l.status === LetterTileStatus.NORMAL
    );
    if (validLetter >= 0) {
      this.letterPool[validLetter].status = LetterTileStatus.ACTIVE;
      this.lastPickedLetters.push(validLetter);
    }
  }

  private undoLastLetter() {
    if (!this.lastPickedLetters.length) {
      return;
    }
    // on backspace, remove last activated letter
    const lpl = this.lastPickedLetters[this.lastPickedLetters.length - 1];
    this.letterPool[lpl].status = LetterTileStatus.NORMAL;
    this.lastPickedLetters.pop();
  }

  private checkWord() {
    if (!this.lastPickedLetters.length) {
      return;
    }
    // Get the word
    let word: string = '';
    this.lastPickedLetters.forEach((lpl) => {
      word += this.letterPool[lpl].letter.toLowerCase();
    });
    console.log('word: ', word);
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
