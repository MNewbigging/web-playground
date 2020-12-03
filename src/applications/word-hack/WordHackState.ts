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
      this.bootComputer();
    } else {
      this.powerDownComputer();
    }
  }

  private bootComputer() {
    this.osState = OSState.BOOTING;
    const loadInterval: number = 30;
    const int = setInterval(() => {
      if (this.osBootProgress >= 100) {
        clearInterval(int);
      } else {
        this.osBootProgress++;
      }
    }, loadInterval);
  }

  private powerDownComputer() {
    this.osState = OSState.OFF;
  }
}
