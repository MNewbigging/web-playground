export interface IRune {
  posX: number;
  posY: number;
  hoverX: number;
  hoverY: number;
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
        hoverX: runePos[2],
        hoverY: runePos[3],
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
        const normalX = 0 - col * 52;
        const normalY = 0 - row * 89;
        const hoverX = normalX - col * 4;
        const hoverY = normalY - row * 4;
        const pos: number[] = [normalX, normalY, hoverX, hoverY];
        positions.push(pos);
      }
    }
    return positions;
  }
}
