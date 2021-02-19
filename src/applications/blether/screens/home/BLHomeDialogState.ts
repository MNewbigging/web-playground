import { action, observable } from 'mobx';

export enum BLHomeDialogForm {
  HOME,
  HOST,
  JOIN,
  JOIN_DETAILS,
}

export class BLHomeDialogState {
  @observable public form = BLHomeDialogForm.HOME;

  @action setHomeForm(form: BLHomeDialogForm) {
    this.form = form;
  }
}
