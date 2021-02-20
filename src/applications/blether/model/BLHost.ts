import { action } from 'mobx';
import Peer from 'peerjs';

import { BLParticipantNamesMessage } from './BLMessages';
import { BLParticipant } from './BLParticipant';

export class BLHost extends BLParticipant {
  public guests: Peer.DataConnection[] = [];

  constructor(name: string) {
    super(name);
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

      // Allow for receiving data from guest
      conn.on('data', this.onReceive);

      // Handle when this guest leaves (doesn't catch when they close tab)
      conn.on('close', () => this.onGuestDisconnect(conn.peer));

      // Add this guest, update all guests of new arrival
      this.participantNames.push(conn.label);
      this.guests.push(conn);
      this.onUpdateGuests();
    });
  };

  protected readonly onReceive = (data: any) => {
    console.log(this.id + ' received: ', data);
  };

  @action private readonly onGuestDisconnect = (guestId: string) => {
    const guest = this.guests.find((g) => g.peer === guestId);
    if (!guest) {
      return;
    }

    console.log('guest has left: ', guest.label);
    this.guests = this.guests.filter((g) => g.peer !== guestId);
    this.participantNames = this.participantNames.filter((name) => name !== guest.label);
    this.onUpdateGuests();
  };

  private onUpdateGuests() {
    // Update all participants of new guest's names
    const guestNames = JSON.stringify(new BLParticipantNamesMessage(this.participantNames));
    this.guests.forEach((conn) => conn.send(guestNames));
  }
}
