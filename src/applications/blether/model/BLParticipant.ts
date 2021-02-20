import { observable } from 'mobx';
import Peer from 'peerjs';

import { BLBaseMessage, BLContentMessage, BLNoteMessage } from './BLMessages';

export abstract class BLParticipant {
  // Info about itself
  @observable public ready = false;
  @observable public hostId: string;
  public name: string;
  public id: string;
  public peer: Peer;

  // Info about the chat
  @observable public participantNames: string[] = [];
  @observable public chatLog: (BLContentMessage | BLNoteMessage)[] = [];

  constructor(name: string, onError: (err: any) => void) {
    this.name = name;

    this.peer = new Peer();
    this.peer.on('open', (id: string) => {
      console.log('my id is: ', id);
      this.peer.on('error', (err: any) => onError(err));
      this.peer.on('disconnected', () => console.log(this.id + ' peer was disconnected'));

      this.id = id;
      this.onPeerOpen(id);
    });
  }

  protected abstract onPeerOpen(id: string): void;

  protected onReceive = (data: any): void => {
    console.log(this.name + ' received: ', data);
    this.parseMessage(JSON.parse(data));
  };

  protected abstract parseMessage(msg: BLBaseMessage): void;

  public abstract sendMessage(msg: BLBaseMessage): void;

  public abstract disconnect(): void;
}
