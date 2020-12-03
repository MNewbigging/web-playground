import { action, observable } from 'mobx';

export enum OSState {
  OFF,
  BOOTING,
  RUNNING,
}

export class WordHackState {
  @observable public computerOn: boolean = false;
  @observable public computerTurningOff: boolean = false;
  @observable public osState = OSState.OFF;
  @observable public osBootProgress: number = 0;

  @action toggleComputerPower() {
    this.computerOn = !this.computerOn;
    this.computerTurningOff = !this.computerOn;

    // If turning on
    if (this.computerOn) {
      this.osState = OSState.BOOTING;
      this.bootComputer();
    } else {
      this.osState = OSState.OFF;
    }
  }

  private bootComputer() {
    this.osBootProgress++;
    if (this.osBootProgress < 100) {
      setTimeout(this.bootComputer, 300);
    }
  }
}
