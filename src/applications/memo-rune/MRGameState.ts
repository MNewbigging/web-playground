import { IRune, RuneUtils, RuneState } from './RuneUtils';

import { action, observable } from 'mobx';

export class MRGameState {
  @observable selectedRunes: IRune[] = [];
  @observable pairedRunes: IRune[] = [];
  @observable dangerRunes: IRune[] = [];
  @observable public runes: IRune[];

  constructor(public pairCount: number) {
    this.runes = RuneUtils.getNRunes(pairCount);
    this.dangerRunes = RuneUtils.getDangerRunes(this.runes, pairCount);
  }

  @action public selectRune = (runeId: number) => {
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

  private checkForDangerRuneMatch() {
    // If the uncovered runes match any 2 in danger runes, get negative points
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
}
