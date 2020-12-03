import { action, observable } from 'mobx';

export class WordHackState {
  @observable computerOn: boolean = false;
  @observable computerTurningOff: boolean = false;

  @action toggleComputerPower() {
    this.computerOn = !this.computerOn;
    this.computerTurningOff = !this.computerOn;
  }
}
