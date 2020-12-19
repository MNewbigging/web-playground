import { IRune, RuneUtils } from './RuneUtils';

export class MRGameState {
  public runes: IRune[];

  constructor(runeCount: number) {
    this.runes = RuneUtils.getNRunes(runeCount);
  }
}
