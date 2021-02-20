import { observable } from 'mobx';
import Peer from 'peerjs';

export abstract class BLParticipant {
  @observable public ready = false;
  @observable public participantNames: string[] = [];
  public name: string;
  public id: string;
  @observable public hostId: string;
  public peer: Peer;

  constructor(name: string, onError: (err: any) => void) {
    this.name = name;

    this.peer = new Peer();
    this.peer.on('open', (id: string) => {
      this.peer.on('error', (err: any) => onError(err));
      this.peer.on('disconnected', () => console.log(this.id + ' peer was disconnected'));

      this.id = id;
      this.onPeerOpen(id);
    });
  }

  protected abstract onPeerOpen(id: string): void;

  protected abstract onReceive(data: any): void;
}
