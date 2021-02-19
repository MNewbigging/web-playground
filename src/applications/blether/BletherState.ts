import { observable } from 'mobx';
import Peer from 'peerjs';

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

  public peer: Peer;
  public conn?: Peer.DataConnection;
  @observable public connections: Peer.DataConnection[] = [];
  @observable peerId = '';
  @observable connectId = '';
  @observable status = 'Waiting';

  constructor() {
    // Check initial window size
    this.checkViewMode(window.innerWidth);

    this.peer = new Peer();

    this.peer.on('open', (id: string) => {
      this.peerId = id;
    });

    // Receiving a connection
    this.peer.on('connection', (conn: Peer.DataConnection) => {
      //this.conn = conn;
      this.connections.push(conn);
    });
  }

  public checkViewMode(w: number) {
    if (w < 760) {
      this.viewMode = BletherViewMode.MOBILE;
    } else {
      this.viewMode = BletherViewMode.DESKTOP;
    }
  }

  public setConnectionId(id: string) {
    this.connectId = id;
  }

  public connect() {
    if (!this.connectId) {
      return;
    }

    // Making a connection
    this.connections.push(this.peer.connect(this.connectId));
  }

  private receive() {}
}
