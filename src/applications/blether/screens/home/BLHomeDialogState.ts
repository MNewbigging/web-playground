import { action, observable } from 'mobx';

export enum BLHomeDialogForm {
  HOME,
  HOST,
  JOIN,
}

export class BLHomeDialogState {
  @observable public form = BLHomeDialogForm.HOME;

  @action setHomeForm(form: BLHomeDialogForm) {
    this.form = form;
  }
}
