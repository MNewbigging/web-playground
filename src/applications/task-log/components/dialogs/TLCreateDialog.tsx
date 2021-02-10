import { observer } from 'mobx-react';

import React from 'react';

import { TLCreateItem } from './TLCreateItem';
import { TLCreateItemState } from './TLCreateItemState';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

import './tl-create-dialog.scss';

@observer
export class TLCreateDialog extends React.PureComponent {
  private ciState = new TLCreateItemState();
  public render() {
    return (
      <TLDialog
        state={tlDialogsState.createDialogState}
        title={'CREATE_ITEM'}
        onCancel={this.handleCancel}
        onAccept={this.handleCreateItem}
        acceptText={'CREATE'}
        className={'create-dialog'}
      >
        <TLCreateItem ciState={this.ciState} />
      </TLDialog>
    );
  }

  private readonly handleCancel = () => {
    tlDialogsState.closeCreateDialog();
    this.ciState = new TLCreateItemState();
  };

  private readonly handleCreateItem = () => {
    this.ciState.createTodoItem();
    this.ciState = new TLCreateItemState();
  };
}
