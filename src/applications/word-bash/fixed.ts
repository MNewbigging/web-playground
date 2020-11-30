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

export interface Lifelines {
  vowels: number;
  consonants: number;
}

export enum PoolSize {
  SMALL = 30,
  MEDIUM = 50,
  LARGE = 70,
}

// Delay on bool switch, determines length of time css class is applied
export const wrongAnswerDelay: number = 1000;
export const rightAnswerDelay: number = 500;
