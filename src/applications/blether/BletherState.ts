import { observable } from 'mobx';
import { BLGuest } from './model/BLGuest';
import { BLHost } from './model/BLHost';
import { BLParticipant } from './model/BLParticipant';
import { BLChatState } from './screens/chat/BLChatState';
import { BLHomeDialogState } from './screens/home/BLHomeDialogState';

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
  @observable public joining = false;
  public homeState = new BLHomeDialogState();
  public chatState?: BLChatState;

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
    this.participant = new BLHost(name, this.onHostError);
    this.bScreen = BletherScreen.CHAT;
  }

  public joinChat(name: string, hostId: string) {
    if (this.participant === undefined) {
      this.participant = new BLGuest(name, hostId, this.onGuestError);
      this.joining = true;
      this.bScreen = BletherScreen.CHAT;
    }
  }

  public cancelJoin() {
    if (this.participant !== undefined) {
      this.participant = undefined;
      this.joining = false;
      this.bScreen = BletherScreen.HOME;
    }
  }

  public exitChat() {
    this.participant.disconnect();
    this.cancelJoin();
  }

  private readonly onHostError = (err: any) => {
    console.log('host error: ', err);
  };

  private readonly onGuestError = (err: any) => {
    console.log('guest error: ', err);
    this.cancelJoin();
  };
}
