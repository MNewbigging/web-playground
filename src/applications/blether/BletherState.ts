import { observable } from 'mobx';
import { BLGuest } from './model/BLGuest';
import { BLHost } from './model/BLHost';
import { BLParticipant } from './model/BLParticipant';

export enum BletherScreen {
  HOME,
  CHAT,
}

export enum BletherViewMode {
  DESKTOP,
  MOBILE,
}

export class BletherState {
  @observable public bScreen = BletherScreen.HOME;
  @observable public viewMode = BletherViewMode.DESKTOP;
  public participant?: BLParticipant;

  constructor() {
    // Check initial window size
    this.checkViewMode(window.innerWidth);
  }

  public checkViewMode(w: number) {
    if (w < 760) {
      this.viewMode = BletherViewMode.MOBILE;
    } else {
      this.viewMode = BletherViewMode.DESKTOP;
    }
  }

  public hostChat(name: string) {
    this.participant = new BLHost(name);
    this.bScreen = BletherScreen.CHAT;
  }

  public joinChat(name: string, hostId: string) {
    this.participant = new BLGuest(name, hostId);
    this.bScreen = BletherScreen.CHAT;
  }
}
