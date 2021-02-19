import { action, observable } from 'mobx';

export enum BLHomeDialogForm {
  HOME,
  HOST,
  JOIN,
}

export class BLHomeDialogState {
  @observable public form = BLHomeDialogForm.HOME;
  @observable public name = '';
  @observable public joinId = '';

  @action setHomeForm(form: BLHomeDialogForm) {
    this.form = form;
  }

  @action setName(name: string) {
    this.name = name;
  }

  @action setJoinId(id: string) {
    this.joinId = id;
  }
}
