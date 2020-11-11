enum Vowels {
  ALL = 'AEIOU',
}

enum Consonants {
  COMMON = 'BCDFGHKLMNPRST',
  UNCOMMON = 'JVWY',
  RARE = 'QXZ',
}

interface ConsonantsWeight {
  common: number;
  uncommon: number;
  rare: number;
}

export class LetterGenerator {
  private Consonants = Consonants;
  private Vowels = Vowels;

  private minVowelRatio: number = 0.25;
  private maxVowelRatio: number = 0.42;

  constructor() {
    const weight: ConsonantsWeight = {
      common: 3,
      uncommon: 2,
      rare: 1,
    };
    const consonants: string = this.getConsonants(weight);
    const vowelRatio: number = this.getVowelRatio();
    console.log('consonants: ', consonants);
    console.log('vowelRatio: ', vowelRatio);
    this.generateVowels(vowelRatio, 40);
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

  // Random vowel ratio within a range
  private getVowelRatio() {
    const range = this.maxVowelRatio - this.minVowelRatio;
    const ratio = Math.random() * range;
    return this.minVowelRatio + ratio;
  }

  // Takes vowel ratio and total letters, generates random vowels
  private generateVowels(ratio: number, poolSize: number) {
    const vowelCount = Math.floor(poolSize * ratio);
    console.log('vowel count: ', vowelCount);
  }
}
