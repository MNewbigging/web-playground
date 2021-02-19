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

  @action public setHomeForm(form: BLHomeDialogForm) {
    this.form = form;
  }

  @action public setName(name: string) {
    this.name = name;
  }

  @action public setJoinId(id: string) {
    this.joinId = id;
  }
}
