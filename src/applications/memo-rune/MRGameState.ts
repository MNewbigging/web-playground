import { IRune, RuneUtils, RuneState } from './RuneUtils';

import { action, observable } from 'mobx';

export class MRGameState {
  @observable selectedRunes: IRune[] = [];
  @observable pairedRunes: IRune[] = [];
  @observable dangerRunes: IRune[] = [];
  @observable public runes: IRune[];

  constructor(public runeCount: number) {
    this.runes = RuneUtils.getNRunes(runeCount);
    this.setupDangerRunes();
  }

  @action selectRune = (runeId: number) => {
    const rune = this.runes.find((r) => r.id === runeId);

    if (!this.runeSelectionValid(rune)) {
      return;
    }

    rune.state = RuneState.FACE_UP;
    this.selectedRunes.push(rune);

    this.checkForDangerRuneMatch();
    this.checkForRuneMatch();
  };

  private runeSelectionValid(rune: IRune) {
    // Can't select a paired rune
    if (rune.state === RuneState.PAIRED) {
      return false;
    }

    // Can only select a currently unselected rune
    if (this.selectedRunes.includes(rune)) {
      return false;
    }

    // Can only select up to 2 runes
    if (this.selectedRunes.length === 2) {
      return false;
    }

    return true;
  }

  private checkForRuneMatch() {
    if (this.selectedRunes.length <= 1) {
      return;
    }

    const rune1 = this.selectedRunes[0];
    const rune2 = this.selectedRunes[1];

    if (rune1.posX === rune2.posX && rune1.posY === rune2.posY) {
      setTimeout(this.pairSelectedRunes, 1000);
    } else {
      setTimeout(this.clearSelectedRunes, 1000);
    }
  }

  private pairSelectedRunes = () => {
    // Make a deep copy of this rune for the paired runes list
    // Don't want further changes to affect this (like state)
    this.pairedRunes.push(Object.assign({}, this.selectedRunes[0]));

    this.selectedRunes.forEach((r) => {
      r.state = RuneState.PAIRED;
    });

    this.selectedRunes = [];
  };

  // If the uncovered runes match any 2 in danger runes, get negative points
  private checkForDangerRuneMatch() {
    this.selectedRunes.forEach((sr) => {
      // Find any matches with danger runes
      const match = this.dangerRunes.find((dr) => dr.posX === sr.posX && dr.posY === sr.posY);
      if (match) {
        match.state = RuneState.DANGER_MATCH;
      }
    });
  }

  private clearSelectedRunes = () => {
    this.selectedRunes.forEach((r) => {
      r.state = RuneState.FACE_DOWN;
    });

    this.selectedRunes = [];

    this.dangerRunes.forEach((dr) => {
      dr.state = RuneState.FACE_UP;
    });
  };

  private setupDangerRunes() {
    // Pick up to 4 random runes to make up float
    // Can pick from ids 0 up to game size (rest are dupes)
    const availableRunes = this.runes.filter((r) => r.id < this.runeCount);
    const floatLength = Math.min(this.runeCount / 2 - 2, 5);

    for (let i = 0; i < floatLength; i++) {
      const rnd = Math.floor(Math.random() * availableRunes.length);
      const rune = Object.assign({}, availableRunes[rnd]); // deep copy, don't want to affect runes
      rune.state = RuneState.FACE_UP;
      this.dangerRunes.push(rune);
      availableRunes.splice(rnd, 1);
    }
  }
}
