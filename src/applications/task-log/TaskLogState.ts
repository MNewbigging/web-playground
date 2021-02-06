import { action, observable } from 'mobx';

export enum TLScreen {
  DASH = 'dash',
  TODO = 'todo',
  SETTINGS = 'settings',
}

export class TaskLogState {
  @observable.ref public timeStr: string;
  @observable public tlScreen = TLScreen.DASH;
  @observable public createDialogOpen = false;

  constructor() {
    this.runClock();
  }

  @action public setScreen(tlScreen: TLScreen) {
    this.tlScreen = tlScreen;
  }

  @action public setCreateDialogOpen(val: boolean) {
    this.createDialogOpen = val;
    console.log('dialog open: ', this.createDialogOpen);
  }

  @action private runClock() {
    const time = new Date();
    let hours = time.getHours().toString();
    let mins = time.getMinutes().toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (mins.length < 2) {
      mins = '0' + mins;
    }

    this.timeStr = `${hours}:${mins}`;

    // Find how many seconds til next minute passes
    const remainingSeconds = 60 - time.getSeconds();
    setTimeout(() => this.runClock(), remainingSeconds * 1000);
  }
}
