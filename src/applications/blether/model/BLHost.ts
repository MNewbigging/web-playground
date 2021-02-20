import Peer from 'peerjs';
import { BLParticipant } from './BLParticipant';

export class BLHost extends BLParticipant {
  public guests: Peer.DataConnection[] = [];

  constructor(name: string) {
    super(name);
    this.peer.on('connection', this.onConnection);
  }

  protected onPeerOpen = (id: string) => {
    this.hostId = id;
    this.ready = true;
  };

  protected readonly onConnection = (conn: Peer.DataConnection) => {
    console.log('received connection from: ', conn);

    conn.on('open', () => {
      console.log('connection to guest now open');
      conn.send(`Hi ${conn.label}, my name is ${this.name}`);
      conn.on('data', this.onReceive);
    });

    this.guests.push(conn);
  };

  protected readonly onReceive = (data: any) => {
    console.log(this.id + ' received: ', data);
  };
}
