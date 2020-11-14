import { action, observable } from 'mobx';

import { ConsonantsWeight, LetterGenerator } from './LetterGenerator';

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
  delay: number;
}

interface Lifelines {
  vowels: number;
  consonants: number;
}

export class WordBashState {
  @observable public wonGame: boolean = false;
  private letterGenerator = new LetterGenerator();

  // Player lifeline abilities
  @observable public lifeline: Lifelines = {
    vowels: 5,
    consonants: 5,
  };

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

  // Letter generation values
  private readonly letterPoolSizeLimit: number = 40;
  private weight: ConsonantsWeight = {
    common: 3,
    uncommon: 2,
    rare: 1,
  };
  private letterAnimDelayStep: number = 0.1;

  // Called from menu
  @action public startGame() {
    // Get game letters
    const gameLetters = this.letterGenerator.generateLetters(this.letterPoolSizeLimit, this.weight);

    // setup letter pool
    this.setupLetterPool(gameLetters);

    // Move to game screen
    this.toWbScreen(WBScreen.GAME);
  }

  // Called on every key press in game
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

  // Answer tag X callback
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

    // Remove from answers map
    this.allAnswers.delete(answer);
  }

  // GUI +1 vowel button callback
  public getExtraVowel() {
    // Check how many vowels left in lifelines
    if (this.lifeline.vowels > 0) {
      const extraVowel = this.letterGenerator.getRandomVowel();
      this.addLetterToPool(extraVowel);
      this.lifeline.vowels--;
    } else {
      // highlight button red
    }
  }

  // GUI +1 consonant button callback
  public getExtraConsonant() {
    // Check how many consonants left in lifelines
    if (this.lifeline.consonants > 0) {
      const extraCons = this.letterGenerator.getRandomConsonant();
      this.addLetterToPool(extraCons);
      this.lifeline.consonants--;
    } else {
      // highlight button red
    }
  }

  // On start game, preps letter pool
  private setupLetterPool(letters: string) {
    // Assign delay for cascade animation of letters
    const rowDelayStep: number = 0.2;
    const colDelayStep: number = 0.1;
    let col: number = 1;
    let row: number = 1;
    // tslint:disable-next-line: prefer-for-of
    for (let i: number = 0; i < letters.length; i++) {
      const delay = col * colDelayStep + row * rowDelayStep;
      if (col === 10) {
        col = 0;
        row++;
      }
      col++;

      this.letterPool.push({
        letter: letters[i],
        status: LetterTileStatus.NORMAL,
        delay,
      });
    }
  }

  // Character keyboard press
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

  // Backspace keyboard press
  private undoLastLetter() {
    if (!this.lastPickedLetters.length) {
      return;
    }
    // on backspace, remove last activated letter
    const lpl = this.lastPickedLetters[this.lastPickedLetters.length - 1];
    this.letterPool[lpl].status = LetterTileStatus.NORMAL;
    this.lastPickedLetters.pop();
  }

  // Enter keyboard press
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

    // Ensure no duplicate answers
    if (this.allAnswers.has(word)) {
      this.rejectAnswer();
      return;
    }

    this.acceptAnswer(word);
    this.setChosenLettersInactive();

    this.checkForEndGame();
  }

  // Reads local dictionary txt file
  private async getDictionary(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    return response.text(); // contains entire txt file in a string
  }

  // Searches dictionary words for target word
  private lookupWord(dictionary: string[], word: string): boolean {
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

  // Sets bool true then false on delay, for css effects
  @action private rejectAnswer() {
    this.wrongAnswer = true;
    setTimeout(() => (this.wrongAnswer = false), this.wrongAnswerDelay);
  }

  // When accepting an answer
  private setChosenLettersInactive() {
    this.lastPickedLetters.forEach((lpl) => {
      this.letterPool[lpl].status = LetterTileStatus.INACTIVE;
    });
    this.lastPickedLetters = [];
  }

  private addLetterToPool(letter: string) {
    if (this.letterPool.length >= 70) {
      return;
    }
    // Newly added letters have no animation delay
    this.letterPool.push({
      letter,
      status: LetterTileStatus.NORMAL,
      delay: 0,
    });
  }

  @action private toWbScreen(wbState: WBScreen) {
    this.wbScreen = wbState;
  }

  @action private checkForEndGame() {
    let allInactive: boolean = true;
    this.letterPool.forEach((lpl) => {
      if (lpl.status !== LetterTileStatus.INACTIVE) {
        allInactive = false;
      }
    });

    if (allInactive) {
      this.wonGame = true;
    }
  }
}
