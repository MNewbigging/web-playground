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
  @observable public p1Turn: boolean = true;
  @observable public winner?: number;

  constructor(public pairCount: number, public playerCount: number = 2) {
    this.runes = RuneUtils.getNRunes(pairCount);
    this.dangerRunes = RuneUtils.getDangerRunes(this.runes);
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
    this.checkHighlightDangerRunes();

    // See if there's a pair
    this.checkSelectedRunes();
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

  private checkHighlightDangerRunes() {
    // Highlight a match with existing selected rune(s)
    this.selectedRunes.forEach((sr) => {
      // Find any matches with danger runes
      const match = this.dangerRunes.find((dr) => RuneUtils.isRunePair(sr, dr));
      if (match) {
        match.state = RuneState.DANGER_MATCH;
      }
    });
  }

  private checkSelectedRunes() {
    if (this.selectedRunes.length <= 1) {
      return;
    }

    const rune1 = this.selectedRunes[0];
    const rune2 = this.selectedRunes[1];

    if (RuneUtils.isRunePair(rune1, rune2)) {
      setTimeout(this.gotRunePair, RuneUtils.pairRuneDelay);
    } else {
      setTimeout(this.noRunePair, RuneUtils.clearRuneDelay);
    }
  }

  private gotRunePair = () => {
    // Update selected runes to be paired
    this.selectedRunes.forEach((r) => {
      r.state = RuneState.PAIRED;
    });

    for (const sr of this.selectedRunes) {
      // If this also matched a danger rune, reset danger rune float (only 1 may match)
      const match = this.dangerRunes.find((dr) => RuneUtils.isRunePair(sr, dr));
      if (match) {
        const remainingRunes = this.runes.filter((rr) => rr.state !== RuneState.PAIRED);
        this.dangerRunes = RuneUtils.getDangerRunes(remainingRunes);
        break;
      }
    }

    // Make a deep copy of this rune for the paired runes list
    // Don't want further changes to affect this (like state)
    this.pairedRunes.push(Object.assign({}, this.selectedRunes[0]));

    // Clear selected runes
    this.selectedRunes = [];

    // Reset danger runes now that there are no selected runes
    this.resetDangerRunes();

    // Player scores
    this.scorePoint();

    // Check for end game
    this.checkForEndGame();
  };

  private noRunePair = () => {
    // First check if we match with 2 danger runes
    this.checkDangerRuneMatch();

    this.selectedRunes.forEach((r) => {
      r.state = RuneState.FACE_DOWN;
    });

    // Clear selected runes
    this.selectedRunes = [];

    // Reset danger runes now that there are no selected runes
    this.resetDangerRunes();

    this.changeTurns();
  };

  private checkDangerRuneMatch() {
    let matches = 0;
    this.selectedRunes.forEach((sr) => {
      const match = this.dangerRunes.some((dr) => RuneUtils.isRunePair(sr, dr));
      if (match) {
        matches++;
      }
    });

    if (matches === 2) {
      this.scoreDangerRune();
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

  private scorePoint() {
    // Award points to current player
    if (this.playerCount === 2 && !this.p1Turn) {
      this.p2Pairs++;
    } else {
      this.p1Pairs++;
    }
  }

  private changeTurns = () => {
    // Swap turns in a 2p game
    if (this.playerCount === 2) {
      this.p1Turn = !this.p1Turn;
    }
  };

  private resetDangerRunes() {
    this.dangerRunes.forEach((dr) => {
      dr.state = RuneState.FACE_UP;
    });
  }

  private checkForEndGame() {
    if (this.runes.some((r) => r.state !== RuneState.PAIRED)) {
      return;
    }

    if (this.playerCount === 1) {
      this.winner = 1;
      return;
    }

    // For two players, compare scores
    if (this.p1Pairs - this.p1DangerRunes > this.p2Pairs - this.p2DangerRunes) {
      this.winner = 1;
    } else {
      this.winner = 2;
    }
  }
}
