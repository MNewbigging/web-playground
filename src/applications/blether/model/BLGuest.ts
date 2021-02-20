import { action } from 'mobx';
import Peer from 'peerjs';
import { BLBaseMessage, BLMessageType, BLParticipantNamesMessage } from './BLMessages';
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

      // Allow for receiving data from host
      this.host.on('data', this.onReceive);

      this.host.send('Hello host, from ' + this.name);

      // Ready to show chat screen now
      this.ready = true;
    });

    this.host.on('error', (err: any) => console.log('error connecting to host: ', err));

    // setTimeout(this.checkConnection, 500);
  };

  private readonly checkConnection = () => {
    console.log('checking connection: ', this.ready);
    if (!this.ready) {
      console.log('host conn: ', this.host);
      this.host.send('hello');
      setTimeout(this.checkConnection, 500);
    }
  };

  protected readonly onReceive = (data: any) => {
    console.log(this.id + ' received: ', data);

    // Parse the data
    this.parseMessage(JSON.parse(data));
  };

  @action private parseMessage(message: BLBaseMessage): message is BLBaseMessage {
    console.log('parsing message');
    switch (message.type) {
      case BLMessageType.PARTICIPANT_NAMES:
        const pnMsg = message as BLParticipantNamesMessage;
        this.participantNames = pnMsg.names;
        break;
    }

    return;
  }
}
