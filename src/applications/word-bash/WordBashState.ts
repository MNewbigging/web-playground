import { action, observable } from 'mobx';

import { LetterGenerator } from './LetterGenerator';

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
  private letterGenerator = new LetterGenerator();
  @observable public wbScreen: WBScreen = WBScreen.MENU;
  @observable public letterPool: ILetterTile[] = []; // current letters in play
  @observable public lastPickedLetters: number[] = []; // stores picked letters as indices into letter pool

  // Answer values
  @observable public wrongAnswer: boolean = false;
  private wrongAnswerDelay: number = 1000;
  @observable public rightAnswer: boolean = false;
  private rightAnswerDelay: number = 500;
  @observable public answers3To4: string[] = [];
  @observable public answers5To6: string[] = [];
  @observable public answers7To8: string[] = [];
  @observable public answers9Plus: string[] = [];
  private allAnswers = new Map<string, number[]>(); // answer string: index into letter pool

  // Letter pool generation values
  private readonly vowels: string[] = ['A', 'E', 'I', 'O', 'U'];
  private readonly consonants: string = 'BCDFGHJKLMNPQRSTVWXYZBCDFGHJKLMNPRSTVWYBCDFGHKLMNPRST';
  private readonly letterPoolSizeLimit: number = 40;

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

  @action public removeAnswer(answer: string) {
    // Remove from answers array to update answer pool
    const length = answer.length;
    switch (true) {
      case length < 5:
        this.answers3To4 = this.answers3To4.filter((ans) => ans !== answer);
        break;
      case length < 7:
        this.answers5To6 = this.answers5To6.filter((ans) => ans !== answer);
        break;
      case length < 9:
        this.answers7To8 = this.answers7To8.filter((ans) => ans !== answer);
        break;
      case length >= 9:
        this.answers9Plus = this.answers9Plus.filter((ans) => ans !== answer);
        break;
    }
    // Make those letters active again
    const answerLetterPositions = this.allAnswers.get(answer);
    answerLetterPositions.forEach((alp) => {
      this.letterPool[alp].status = LetterTileStatus.NORMAL;
    });
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

  private async checkWord() {
    if (!this.lastPickedLetters.length) {
      this.rejectAnswer();
      return;
    }

    // Get the word
    let word: string = '';
    this.lastPickedLetters.forEach((lpl) => {
      word += this.letterPool[lpl].letter.toLowerCase();
    });

    // Exit if word too short
    if (word.length < 3) {
      this.rejectAnswer();
      return;
    }

    // Build file path for lookup
    const filePath: string = '/dist/assets/word-data/' + word[0] + '.txt';

    // Get dictionary txt file for this word
    const fileContents = await this.getDictionary(filePath);
    const dictionary = fileContents.split('\n');

    // Search dictionary
    if (!this.lookupWord(dictionary, word)) {
      this.rejectAnswer();
      return;
    }

    this.acceptAnswer(word);
    this.setChosenLettersInactive();
  }

  private async getDictionary(filePath: string) {
    const response = await fetch(filePath);
    return response.text(); // contains entire txt file in a string
  }

  private lookupWord(dictionary: string[], word: string) {
    // tslint:disable-next-line: prefer-for-of
    for (let i: number = 0; i < dictionary.length; i++) {
      if (dictionary[i] === word) {
        console.log('found match');
        return true;
      }
    }
    return false;
  }

  @action private acceptAnswer(answer: string) {
    // Add answer to array for display
    const len = answer.length;
    switch (true) {
      case len < 5:
        this.answers3To4.push(answer);
        break;
      case len < 7:
        this.answers5To6.push(answer);
        break;
      case len < 9:
        this.answers7To8.push(answer);
        break;
      case len >= 9:
        this.answers9Plus.push(answer);
        break;
      default:
        return;
    }
    // Add to answer map with position of letters in pool
    this.allAnswers.set(answer, this.lastPickedLetters);

    // Update classes for visual cue
    this.rightAnswer = true;
    setTimeout(() => (this.rightAnswer = false), this.rightAnswerDelay);
  }

  @action private rejectAnswer() {
    this.wrongAnswer = true;
    setTimeout(() => (this.wrongAnswer = false), this.wrongAnswerDelay);
  }

  private setChosenLettersInactive() {
    this.lastPickedLetters.forEach((lpl) => {
      this.letterPool[lpl].status = LetterTileStatus.INACTIVE;
    });
    this.lastPickedLetters = [];
  }

  private prepLetterPool() {
    this.letterPool = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i: number = 0; i < this.letterPoolSizeLimit; i++) {
      let char: string = '';
      const rnd: number = Math.random();
      if (rnd < 0.33) {
        // vowel
        char = this.vowels[Math.floor(Math.random() * this.vowels.length)];
      } else {
        // consonant
        char = this.consonants[Math.floor(Math.random() * this.consonants.length)];
      }

      this.letterPool.push({
        letter: char,
        status: LetterTileStatus.NORMAL,
      });
    }
  }

  // Looks at generated letters, tidies up outliers
  private preenLetters() {
    const vowelRatio: number = 6;
    const maxVowelDupes = Math.floor(this.letterPoolSizeLimit / vowelRatio);

    const toSwapOut: string[] = [];
    const toSwapCount: number[] = [];

    for (let i: number = 0; i < this.vowels.length; i++) {
      const searchLetter = this.vowels[i];
      const count = this.getLetterCount(searchLetter);
      if (count > maxVowelDupes) {
        toSwapOut.push(searchLetter);
        toSwapCount.push(count - maxVowelDupes);
      }
    }

    // now we have vowels that are too many; replace with others
    const availableVowels: string[] = this.vowels.filter((v) => !toSwapOut.includes(v));
    toSwapOut.forEach((swap, idx) => {
      // How many times to swap out letter
      for (let i: number = 0; i < toSwapCount[idx]; i++) {
        // find a new letter
        const rnd = Math.random();
      }
    });
  }

  private getLetterCount(letter: string) {
    let count = 0;

    this.letterPool.forEach((lp) => {
      if (lp.letter === letter) {
        count++;
      }
    });

    return count;
  }

  private replaceLetter(from: string, to: string) {
    for (let i: number = 0; i < this.letterPool.length; i++) {
      if (this.letterPool[i].letter === from) {
        this.letterPool[i].letter = to;
      }
    }
  }
}
