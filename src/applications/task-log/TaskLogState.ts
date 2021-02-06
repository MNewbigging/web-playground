import { action, observable } from 'mobx';

export class TaskLogState {
  @observable.ref public timeStr: string;

  constructor() {
    this.runClock();
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
