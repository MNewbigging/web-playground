import { IRune, RuneUtils } from './RuneUtils';

export class MRGameState {
  public runes: IRune[];
  private readonly runeWidth: number = 52;

  constructor(runeCount: number) {
    this.runes = RuneUtils.getNRunes(runeCount);
  }
}
