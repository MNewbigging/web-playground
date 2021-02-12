import { action, observable } from 'mobx';

import { Todo } from '../../model/TLTodo';

export enum DialogState {
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

class TLDialogsState {
  @observable public createDialogState = DialogState.CLOSED;
  @observable public detailsDialogState = DialogState.CLOSED;
  @observable public detailsTodo?: Todo;
  @observable public editDialogState = DialogState.CLOSED;
  public editTodo?: Todo;

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

  @action public openDetailsDialog(todo: Todo) {
    this.detailsTodo = todo;
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

  @action public updateDetailsDialogTodo(todo: Todo) {
    if (this.detailsTodo?.id === todo.id) {
      this.detailsTodo = todo;
    }
  }

  @action public openEditdialog(todo: Todo) {
    this.editTodo = todo;
    this.editDialogState = DialogState.OPEN;
  }

  @action public closeEditDialog() {
    this.editDialogState = DialogState.CLOSING;
    setTimeout(() => {
      if (this.editDialogState === DialogState.CLOSING) {
        this.editDialogState = DialogState.CLOSED;
      }
    }, this.dialogCloseDelay);
  }
}

export const tlDialogsState = new TLDialogsState();
