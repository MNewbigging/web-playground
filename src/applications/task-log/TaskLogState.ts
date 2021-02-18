import { action, observable } from 'mobx';

import { TLDashState } from './components/screens/dashboard/TLDashState';
import { TLTodoState } from './components/screens/todo/TLTodoState';
import { tlDatabase } from './store/TLDatabase';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export enum TLScreen {
  DASH = 'dash',
  TODO = 'todo',
  SETTINGS = 'settings',
}

export enum TLOverlayTOD {
  MORNING = 'morning',
  DAY = 'day',
  NIGHT = 'night',
}

export class TaskLogState {
  @observable.ref public timeStr: string;
  @observable.ref public dateStr: string;
  @observable public tlScreen = TLScreen.DASH;
  @observable.ref public tlOverlayTod = TLOverlayTOD.MORNING;

  public todoState = new TLTodoState();
  public dashState = new TLDashState();

  constructor() {
    this.runClock();
    // tlDatabase.reset();
    tlDatabase.load();
  }

  @action public setScreen(tlScreen: TLScreen) {
    this.tlScreen = tlScreen;
  }

  @action private runClock() {
    const time = new Date();
    const hours = time.getHours();
    let hoursStr = hours.toString();
    let mins = time.getMinutes().toString();

    if (hoursStr.length < 2) {
      hoursStr = '0' + hours;
    }

    if (mins.length < 2) {
      mins = '0' + mins;
    }

    this.timeStr = `${hoursStr}:${mins}`;

    const day = DAYS[time.getDay()];
    const date = time.getDate();
    this.dateStr = `${day} ${date}`;

    switch (true) {
      case hours >= 4 && hours < 12:
        this.tlOverlayTod = TLOverlayTOD.MORNING;
        break;
      case hours >= 12 && hours < 18:
        this.tlOverlayTod = TLOverlayTOD.DAY;
        break;
      default:
        this.tlOverlayTod = TLOverlayTOD.NIGHT;
        break;
    }

    // Find how many seconds til next minute passes
    const remainingSeconds = 60 - time.getSeconds();
    setTimeout(() => this.runClock(), remainingSeconds * 1000);
  }
}
