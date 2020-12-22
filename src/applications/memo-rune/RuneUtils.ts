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
  public static pairRuneDelay: number = 1000;
  public static clearRuneDelay: number = 800;

  public static getNRunes(pairCount: number) {
    const allRunePositions = this.getRunePositions();
    const chosenRunes: IRune[] = [];

    for (let i = 0; i < pairCount; i++) {
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
      // Remove it from positions array so we don't pick it again
      allRunePositions.splice(runeIdx, 1);
    }

    // chosen runes are unique, double them to make pairs (ensure a deep copy via object assign)
    const runePairs: IRune[] = [...chosenRunes];
    chosenRunes.forEach((r) => runePairs.push(Object.assign({}, r)));

    // Runes each need uid, do so now we have all runes
    runePairs.forEach((rp, i) => {
      rp.id = i;
    });

    // Shuffle runes so pairs aren't always neighbours
    return this.shuffleRunes(runePairs);
  }

  public static getDangerRunes(runes: IRune[], pairCount: number) {
    const dangerRunes: IRune[] = [];

    // Can pick from ids 0 up to pair count (rest are dupes)
    const availableRunes = runes.filter((r) => r.id < pairCount);

    // Pick up to 4 random runes to make up float
    const maxDangerRunes = 5;
    const floatLength = Math.min(pairCount / 2 - 2, maxDangerRunes);

    for (let i = 0; i < floatLength; i++) {
      const rnd = Math.floor(Math.random() * availableRunes.length);
      const dangerRune = Object.assign({}, availableRunes[rnd]); // deep copy, don't want to affect runes
      dangerRune.state = RuneState.FACE_UP;
      dangerRunes.push(dangerRune);
      availableRunes.splice(rnd, 1); // remove so not picked again
    }

    return dangerRunes;
  }

  public static isRunePair(ra: IRune, rb: IRune) {
    // Runes are pairs if they have the same position on sprite sheet
    return ra.posX === rb.posX && ra.posY === rb.posY;
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
    positions.push(extraRunePos);

    // First rune is the empty one, not valid here
    positions.shift();

    return positions;
  }

  private static shuffleRunes(runes: IRune[]) {
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
