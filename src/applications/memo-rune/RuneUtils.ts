export interface IRune {
  id: number;
  posX: number;
  posY: number;
  hoverX: number;
  hoverY: number;
  state: RuneState;
}

export enum RuneState {
  FACE_DOWN,
  FACE_UP,
  PAIRED,
  DANGER_MATCH,
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
        id: 0, // set id properly in shuffle method
        posX: runePos[0],
        posY: runePos[1],
        hoverX: runePos[2],
        hoverY: runePos[3],
        state: RuneState.FACE_DOWN,
      };
      chosenRunes.push(rune);
      // Remove it from array so we don't pick it again
      allRunePositions.splice(runeIdx, 1);
    }

    // chosen runes are unique, double them to make pairs (ensure a deep copy via object assign)
    const runePairs: IRune[] = [...chosenRunes];
    chosenRunes.forEach((r) => runePairs.push(Object.assign({}, r)));
    return this.shuffleRunes(runePairs);
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
    // Add in the extra rune from row 1
    const extraRunePos = [52, 0, 56, 0];

    // First rune is the empty one, not valid here
    positions.shift();

    positions.push(extraRunePos);

    return positions;
  }

  private static shuffleRunes(runes: IRune[]) {
    // Assign proper ids to runes
    runes.forEach((r, i) => {
      r.id = i;
    });
    // Random shuffle
    for (let i = runes.length - 1; i > 0; i--) {
      const newPos = Math.floor(Math.random() * (i + 1));
      const temp = runes[i];
      runes[i] = runes[newPos];
      runes[newPos] = temp;
    }

    return runes;
  }
}
