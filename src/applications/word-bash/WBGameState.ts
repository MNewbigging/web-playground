import { action, observable } from 'mobx';

import {
  ILetterTile,
  LetterTileStatus,
  Lifelines,
  PoolSize,
  rightAnswerDelay,
  wrongAnswerDelay,
} from './fixed';
import { ConsonantsWeight, LetterGenerator } from './LetterGenerator';

export class WBGameState {
  // Game setup values
  private letterPoolSize: PoolSize;
  private consonantsWeight: ConsonantsWeight;
  private letterGenerator = new LetterGenerator();

  // Player values
  @observable public lifelines: Lifelines = {
    vowels: 5,
    consonants: 5,
  };
  @observable public gameScore: number = 0;

  // Game values
  @observable public letterPool: ILetterTile[] = [];
  @observable public lastPickedLetters: number[] = []; // stores picked letters as indices into letter pool
  @observable public startWinAnims: boolean = false;
  private winAnimDelay: number = 3000; // how long to wait for win anim to finish in ms
  @observable public wonGame: boolean = false;

  // Answer values
  @observable public wrongAnswer: boolean = false; // controls when css classes active
  @observable public rightAnswer: boolean = false; // controls when css classes active
  private allAnswers = new Map<string, number[]>(); // answer string: index into letter pool
  @observable public answers3To4: string[] = [];
  @observable public answers5To6: string[] = [];
  @observable public answers7To8: string[] = [];
  @observable public answers9Plus: string[] = [];

  constructor(poolSize: PoolSize, consonantsWeight: ConsonantsWeight) {
    this.letterPoolSize = poolSize;
    this.consonantsWeight = consonantsWeight;

    this.setupGame();
  }

  // SETUP
  private setupGame() {
    // Get game letters
    const gameLetters = this.letterGenerator.generateLetters(
      this.letterPoolSize,
      this.consonantsWeight
    );

    // Setup letter pool
    this.setupLetterPool(gameLetters);
  }

  @action private setupLetterPool(letters: string) {
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

  // IN GAME MENU
  // +1 vowel button callback
  public getExtraVowel() {
    // Check how many vowels left in lifelines
    if (this.lifelines.vowels > 0) {
      const extraVowel = this.letterGenerator.getRandomVowel();
      this.addLetterToPool(extraVowel);
      this.lifelines.vowels--;
    }
  }

  // +1 consonant button callback
  public getExtraConsonant() {
    // Check how many consonants left in lifelines
    if (this.lifelines.consonants > 0) {
      const extraCons = this.letterGenerator.getRandomConsonant();
      this.addLetterToPool(extraCons);
      this.lifelines.consonants--;
    }
  }

  @action private addLetterToPool(letter: string) {
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

  // INPUT
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

  // Backspace keyboard press
  private undoLastLetter() {
    if (!this.lastPickedLetters.length) {
      return;
    }
    // on backspace, remove last activated letter
    const lastPickedIdx = this.lastPickedLetters.length - 1;
    this.undoLetterTile(lastPickedIdx);
  }

  // Rejecting a chosen answer letter (backspace or on letter click)
  public undoLetterTile(lastPickedIdx: number) {
    const poolIdx = this.lastPickedLetters[lastPickedIdx];
    this.letterPool[poolIdx].status = LetterTileStatus.NORMAL;
    this.lastPickedLetters.splice(lastPickedIdx, 1);
  }

  // Character keyboard press
  private checkKeyCharacter(key: string) {
    // Only valid if letter exists in normal state
    const validLetter = this.letterPool.findIndex(
      (l) => l.letter.toLowerCase() === key.toLowerCase() && l.status === LetterTileStatus.NORMAL
    );
    if (validLetter >= 0) {
      this.selectLetterTile(validLetter);
    }
  }

  // When clicking/tapping on a letter tile
  public selectLetterTile(idx: number) {
    // Only valid if letter is in normal state
    if (this.letterPool[idx].status === LetterTileStatus.NORMAL) {
      this.letterPool[idx].status = LetterTileStatus.ACTIVE;
      this.lastPickedLetters.push(idx);
    }
  }

  // Enter keyboard press or clicking accept answer button
  public async checkWord() {
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
    this.scoreAnswers();
    this.checkForEndGame();
  }

  @action private rejectAnswer() {
    this.wrongAnswer = true;
    setTimeout(() => (this.wrongAnswer = false), wrongAnswerDelay);
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
    setTimeout(() => (this.rightAnswer = false), rightAnswerDelay);
  }

  // When accepting an answer
  private setChosenLettersInactive() {
    this.lastPickedLetters.forEach((lpl) => {
      this.letterPool[lpl].status = LetterTileStatus.INACTIVE;
    });
    this.lastPickedLetters = [];
  }

  private scoreAnswers() {
    // Scoring:
    // 1 point per letter
    // 3-4 words just get 1 point per letter used
    // 5-6 gets the same, plus 1 point per word
    // 7-8 as above, plus 2 per word
    // 9+ as above, plus 3 per word

    let points = 0;
    // Add 1 point per letter
    this.allAnswers.forEach((ans) => {
      points += ans.length;
    });

    // Add extra points for long answers
    points += this.answers5To6.length;
    points += this.answers7To8.length * 2;
    points += this.answers9Plus.length * 3;

    // If at end game, subtract points for lifelines used
    const extrasUsed = 5 - this.lifelines.vowels + 5 - this.lifelines.consonants;
    points -= extrasUsed;
    this.gameScore = points;
  }

  @action private checkForEndGame() {
    const nonInactive = this.letterPool.find((lpl) => lpl.status !== LetterTileStatus.INACTIVE);
    if (!nonInactive) {
      this.winGame();
    }
  }

  @action private winGame() {
    this.startWinAnims = true;
    this.scoreAnswers();
    setTimeout(() => (this.wonGame = true), this.winAnimDelay);
  }

  // Answer word click callback
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

    // Re-calculate score
    this.scoreAnswers();
  }
}
