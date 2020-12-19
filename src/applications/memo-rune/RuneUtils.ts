import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export interface IRune {
  posX: number;
  posY: number;
}

export class RuneUtils {
  public static getNRunes(runeCount: number) {
    const allRunePositions = this.getRunePositions();
    const chosenRunes: IRune[] = [];

    for (let i = 0; i < runeCount; i++) {
      // Pick a random rune
      const runeIdx = Math.floor(Math.random() * allRunePositions.length);
      const runePos = allRunePositions[runeIdx];
      // Add to list
      const rune: IRune = {
        posX: runePos[0],
        posY: runePos[1],
      };
      chosenRunes.push(rune);
      // Remove it from array so we don't pick it again
      allRunePositions.splice(runeIdx, 1);
    }

    return chosenRunes;
  }

  private static getRunePositions() {
    const positions: number[][] = [];
    // Build runes - there is one left out as first row has 8 not 7 runes
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 5; row++) {
        const pos: number[] = [0 - col * 52, 0 - row * 89];
        positions.push(pos);
      }
    }
    return positions;
  }
}
