enum Vowels {
  ALL = 'AEIOU',
}

enum Consonants {
  COMMON = 'BCDFGHKLMNPRST',
  UNCOMMON = 'JVWY',
  RARE = 'QXZ',
}

export interface ConsonantsWeight {
  common: number;
  uncommon: number;
  rare: number;
}

export class LetterGenerator {
  private minVowelRatio: number = 0.28;
  private maxVowelRatio: number = 0.42;
  private gameVowels: string = '';
  private gameConsonants: string = '';

  public generateLetters(poolSize: number, weight: ConsonantsWeight) {
    const consonants: string = this.getConsonants(weight);
    console.log('consonants: ', consonants);

    const vowelCount: number = this.getVowelCount(poolSize);
    console.log('vowelRatio: ', vowelCount);

    const gameVowels: string = this.generateVowels(vowelCount);
    console.log('game vowels: ', gameVowels);

    const gameConsonants: string = this.generateConsonants(consonants, poolSize, vowelCount);
    console.log('game consonants: ', gameConsonants);

    const shuffledLetters: string = this.shuffleLetters(gameVowels, gameConsonants);
    console.log('shuffled letters: ', shuffledLetters);

    this.gameVowels = gameVowels;
    this.gameConsonants = gameConsonants;

    return shuffledLetters;
  }

  public getRandomVowel() {
    return Vowels.ALL[Math.floor(Math.random() * Vowels.ALL.length)];
  }

  public getRandomConsonant() {
    return this.gameConsonants[Math.floor(Math.random() * this.gameConsonants.length)];
  }

  // Take in weight, build consonants string
  private getConsonants(weight: ConsonantsWeight) {
    let consonants: string = '';
    // Common
    for (let i: number = 0; i < weight.common; i++) {
      consonants += Consonants.COMMON;
    }
    // Uncommon
    for (let i: number = 0; i < weight.uncommon; i++) {
      consonants += Consonants.UNCOMMON;
    }
    // Rare
    for (let i: number = 0; i < weight.rare; i++) {
      consonants += Consonants.RARE;
    }

    return consonants;
  }

  // Gets random vowel count, within range, based on letter pool size
  private getVowelCount(poolSize: number) {
    const range = this.maxVowelRatio - this.minVowelRatio;
    const ratio = this.minVowelRatio + Math.random() * range;
    return Math.floor(poolSize * ratio);
  }

  // Generates n random vowel letters
  private generateVowels(vowelCount: number) {
    let vowels: string = '';
    for (let i: number = 0; i < vowelCount; i++) {
      vowels += Vowels.ALL[Math.floor(Math.random() * Vowels.ALL.length)];
    }
    return vowels;
  }

  private generateConsonants(consonants: string, poolSize: number, vowelCount: number) {
    let gameCons = '';
    const consCount = poolSize - vowelCount; // Remainder of pool after vowels are consonants
    console.log(`pool size ${poolSize} - vowels ${vowelCount} = ${consCount}`);
    for (let i: number = 0; i < consCount; i++) {
      gameCons += consonants[Math.floor(Math.random() * consonants.length)];
    }
    return gameCons;
  }

  // Generated letters will be all vowels, all consonants - this shuffles them
  private shuffleLetters(vowels: string, consonants: string) {
    const letters = vowels + consonants;
    const letterArr: string[] = letters.split('');
    const count = letterArr.length;
    for (let i: number = 0; i < count; i++) {
      const swapIdx: number = Math.floor(Math.random() * count);
      const tmp = letterArr[i];
      letterArr[i] = letterArr[swapIdx];
      letterArr[swapIdx] = tmp;
    }
    return letterArr.join('');
  }
}
