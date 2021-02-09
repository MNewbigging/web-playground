import { action, observable } from 'mobx';

export enum DialogState {
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

class TLDialogsState {
  @observable public createDialogState = DialogState.CLOSED;
  @observable public detailsDialogState = DialogState.CLOSED;

  private readonly dialogCloseDelay = 500;

  @action public openCreateDialog() {
    this.createDialogState = DialogState.OPEN;
  }

  @action public closeCreateDialog() {
    this.createDialogState = DialogState.CLOSING;
    setTimeout(() => {
      if (this.createDialogState === DialogState.CLOSING) {
        this.createDialogState = DialogState.CLOSED;
      }
    }, this.dialogCloseDelay);
  }

  @action public openDetailsDialog() {
    this.detailsDialogState = DialogState.OPEN;
  }

  @action public closeDetailsDialog() {
    this.detailsDialogState = DialogState.CLOSING;
    setTimeout(() => {
      if (this.detailsDialogState === DialogState.CLOSING) {
        this.detailsDialogState = DialogState.CLOSED;
      }
    }, this.dialogCloseDelay);
  }
}

export const tlDialogsState = new TLDialogsState();
