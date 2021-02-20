import { action } from 'mobx';
import Peer from 'peerjs';
import { BLBaseMessage, BLMessageType, BLParticipantNamesMessage } from './BLMessages';
import { BLParticipant } from './BLParticipant';

export class BLGuest extends BLParticipant {
  public host: Peer.DataConnection;

  constructor(name: string, hostId: string, onError: (err: any) => void) {
    super(name, onError);
    this.hostId = hostId;
  }

  protected readonly onPeerOpen = (id: string) => {
    // Attempt to connect with host
    this.host = this.peer.connect(this.hostId, { label: this.name });

    // In case the connection fails, retry
    this.host.peerConnection.onconnectionstatechange = (_ev: Event) => {
      const conState = this.host.peerConnection.connectionState;
      switch (conState) {
        case 'failed':
        case 'disconnected':
          console.log(`${this.name} con to host ${conState}, attempting retyr`);
          this.onPeerOpen(id);
      }
    };
    console.log('guest connected to host: ', this.host);

    this.host.on('open', () => {
      console.log('connection to host now open');

      // Allow for receiving data from host
      this.host.on('data', this.onReceive);

      // Ready to show chat screen now
      this.ready = true;
    });
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
