import Peer from 'peerjs';
import { BLParticipant } from './BLParticipant';

export class BLGuest extends BLParticipant {
  public host: Peer.DataConnection;

  constructor(name: string, hostId: string) {
    super(name);
    this.hostId = hostId;
  }

  protected readonly onPeerOpen = (id: string) => {
    console.log('guest peer open, connecting to host...');
    this.host = this.peer.connect(this.hostId, { label: this.name });
    console.log('guest connected to host: ', this.host);

    this.host.on('open', () => {
      console.log('connection to host now open');
      this.host.on('data', this.onReceive);
      this.host.send('hello host');
      this.ready = true;
    });
  };

  protected readonly onReceive = (data: any) => {
    console.log(this.id + ' received: ', data);
  };
}
