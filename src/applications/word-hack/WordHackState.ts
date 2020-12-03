import { action, observable } from 'mobx';

export class WordHackState {
  @observable computerOn: boolean = false;

  @action toggleComputerPower() {
    this.computerOn = !this.computerOn;
  }
}
