import { observable } from 'mobx';
import Peer from 'peerjs';

export abstract class BLParticipant {
  @observable public ready = false;
  public name: string;
  public id: string;
  @observable public hostId: string;
  public peer: Peer;

  constructor(name: string) {
    this.name = name;
    this.peer = new Peer();
    this.peer.on('open', (id: string) => {
      this.id = id;
      this.onPeerOpen(id);
    });

    this.peer.on('error', (err: any) => console.log('error: ', err));
    this.peer.on('disconnected', () => console.log(this.id + ' peer was disconnected'));
  }

  protected abstract onPeerOpen(id: string): void;

  protected abstract onReceive(data: any): void;
}
