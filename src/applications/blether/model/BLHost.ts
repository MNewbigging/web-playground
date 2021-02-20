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

export class BLHost extends BLParticipant {
  public guests: Peer.DataConnection[] = [];

  constructor(name: string, onError: (err: any) => void) {
    super(name, onError);
    this.peer.on('connection', this.onConnection);
  }

  protected onPeerOpen = (id: string) => {
    this.hostId = id;
    this.participantNames.push(this.name);
    this.ready = true;
  };

  protected readonly onConnection = (conn: Peer.DataConnection) => {
    console.log('received connection from: ', conn);

    conn.on('open', () => {
      console.log('connection to guest now open');
      // Check this conn is unique
      const exists = this.guests.find((guest) => guest.peer === conn.peer);
      if (exists) {
        conn.close();
        return;
      }

      // Allow for receiving data from guest
      conn.on('data', this.onReceive);

      // Handle when this guest leaves (doesn't catch when they close tab)
      conn.on('close', () => this.onGuestDisconnect(conn.peer));

      // Add this guest
      this.participantNames.push(conn.label);
      this.guests.push(conn);

      // Update other guests of new arrival
      this.updateGuestsOfPartyNames();
      const noteMsg = new BLNoteMessage(this.id, `${conn.label} has joined!`);
      this.chatLog.push(noteMsg);
      this.sendMessage(noteMsg);
    });
  };

  protected parseMessage(msg: BLBaseMessage): void {
    switch (msg.type) {
      case BLMessageType.CONTENT:
        const contentMsg = msg as BLContentMessage;
        this.chatLog.push(contentMsg);
        this.sendMessage(msg, msg.senderId);
        break;
    }
  }

  public sendMessage(msg: BLBaseMessage, omit?: string) {
    const msgData = JSON.stringify(msg);
    this.guests.forEach((guest) => {
      if (omit !== undefined && guest.peer === omit) {
        return;
      }
      guest.send(msgData);
    });
  }

  public disconnect(): void {
    this.guests.forEach((guest) => guest.close());
    this.peer.disconnect();
  }

  @action private readonly onGuestDisconnect = (guestId: string) => {
    const guest = this.guests.find((g) => g.peer === guestId);
    if (!guest) {
      return;
    }

    // Update guests of new names list
    console.log('guest has left: ', guest.label);
    this.guests = this.guests.filter((g) => g.peer !== guestId);
    this.participantNames = this.participantNames.filter((name) => name !== guest.label);
    this.updateGuestsOfPartyNames();

    // Send note message
    const noteMsg = new BLNoteMessage(this.id, `${guest.label} has left!`);
    this.chatLog.push(noteMsg);
    this.sendMessage(noteMsg);
  };

  private updateGuestsOfPartyNames() {
    // Update all participants of new guest list
    const guestNames = JSON.stringify(
      new BLParticipantNamesMessage(this.id, this.participantNames)
    );
    this.guests.forEach((conn) => conn.send(guestNames));
  }
}
