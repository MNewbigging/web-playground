import content from '*.svg';
import { action } from 'mobx';
import Peer from 'peerjs';
import {
  BLBaseMessage,
  BLContentMessage,
  BLMessageType,
  BLNoteMessage,
  BLParticipantNamesMessage,
} from './BLMessages';
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

  public sendMessage(msg: BLBaseMessage) {
    this.host.send(JSON.stringify(msg));
  }

  public disconnect(): void {
    this.host.close();
    this.peer.disconnect();
  }

  @action protected parseMessage(message: BLBaseMessage) {
    switch (message.type) {
      case BLMessageType.PARTICIPANT_NAMES:
        const nameMsg = message as BLParticipantNamesMessage;
        this.participantNames = nameMsg.names;
        break;
      case BLMessageType.CONTENT:
        const contentMsg = message as BLContentMessage;
        this.chatLog.push(contentMsg);
        break;
      case BLMessageType.NOTE:
        const noteMsg = message as BLNoteMessage;
        this.chatLog.push(noteMsg);
        break;
    }
    return;
  }
}
