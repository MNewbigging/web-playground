import { action, observable } from 'mobx';

import { DialogState } from './components/core/TLDialog';
import { tlDatabase } from './store/TLDatabase';

export enum TLScreen {
  DASH = 'dash',
  TODO = 'todo',
  SETTINGS = 'settings',
}

export class TaskLogState {
  @observable.ref public timeStr: string;
  @observable public tlScreen = TLScreen.DASH;
  @observable public createDialogState = DialogState.CLOSED;

  constructor() {
    this.runClock();
    tlDatabase.reset();
  }

  @action public setScreen(tlScreen: TLScreen) {
    this.tlScreen = tlScreen;
  }

  @action public openCreateDialog() {
    this.createDialogState = DialogState.OPEN;
  }

  @action public closeCreateDialog() {
    this.createDialogState = DialogState.CLOSING;
    setTimeout(() => {
      if (this.createDialogState === DialogState.CLOSING) {
        this.createDialogState = DialogState.CLOSED;
      }
    }, 500);
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
