import { action, observable } from 'mobx';

export class TLChecklistInputState {
  @observable public active = false;

  @action public openInput() {
    this.active = true;
  }
}
