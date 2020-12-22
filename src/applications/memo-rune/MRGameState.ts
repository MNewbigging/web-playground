import { IRune, RuneUtils, RuneState } from './RuneUtils';

import { action, observable } from 'mobx';

export class MRGameState {
  @observable public selectedRunes: IRune[] = [];
  @observable public pairedRunes: IRune[] = [];
  @observable public dangerRunes: IRune[] = [];
  @observable public runes: IRune[];
  @observable public p1Pairs: number = 0;
  @observable public p1DangerRunes: number = 0;
  @observable public p2Pairs: number = 0;
  @observable public p2DangerRunes: number = 0;
  private p1Turn: boolean = true;

  constructor(public pairCount: number, public playerCount: number = 2) {
    this.runes = RuneUtils.getNRunes(pairCount);
    this.dangerRunes = RuneUtils.getDangerRunes(this.runes, pairCount);
  }

  @action public selectRune = (runeId: number) => {
    // Get the selected rune
    const rune = this.runes.find((r) => r.id === runeId);

    // Ensure selection attempt is valid
    if (!this.runeSelectionValid(rune)) {
      return;
    }

    // Flip it, select it
    rune.state = RuneState.FACE_UP;
    this.selectedRunes.push(rune);

    // Update danger rune display for this selection
    this.checkForDangerRuneMatch();

    // See if there's a pair
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

  private checkForDangerRuneMatch() {
    // Highlight a match with existing selected rune(s)
    let matches = 0;
    this.selectedRunes.forEach((sr) => {
      // Find any matches with danger runes
      const match = this.dangerRunes.find((dr) => RuneUtils.isRunePair(sr, dr));
      if (match) {
        match.state = RuneState.DANGER_MATCH;
        matches++;
      }
    });
    // If the uncovered runes match any 2 in danger runes, get negative points
    if (matches === 2) {
      this.scoreDangerRune();
    }
  }

  private checkForRuneMatch() {
    if (this.selectedRunes.length <= 1) {
      return;
    }

    const rune1 = this.selectedRunes[0];
    const rune2 = this.selectedRunes[1];

    if (RuneUtils.isRunePair(rune1, rune2)) {
      setTimeout(this.pairSelectedRunes, RuneUtils.pairRuneDelay);
    } else {
      setTimeout(this.clearSelectedRunes, RuneUtils.clearRuneDelay);
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

    // Player scores
    this.scorePoint();
  };

  private clearSelectedRunes = () => {
    this.selectedRunes.forEach((r) => {
      r.state = RuneState.FACE_DOWN;
    });

    this.selectedRunes = [];

    // Reset danger runes now that there are no selected runes
    this.dangerRunes.forEach((dr) => {
      dr.state = RuneState.FACE_UP;
    });
  };

  private scorePoint() {
    // Award points to current player
    // if 1 player game or if its 2 and p1turn
    if (this.playerCount < 2) {
      this.p1Pairs++;
    } else {
      if (this.p1Turn) {
        this.p1Pairs++;
        this.p1Turn = false; // no longer p1turn
      } else {
        this.p2Pairs++;
        this.p1Turn = true; // now its p1turn
      }
    }
  }

  private scoreDangerRune() {
    // Danger runes award negative points
    if (this.playerCount === 2 && !this.p1Turn) {
      this.p2DangerRunes++;
    } else {
      this.p1DangerRunes++;
    }
  }
}
