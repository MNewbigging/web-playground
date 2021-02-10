import { observer } from 'mobx-react';

import React from 'react';

import { tlDatabase } from '../../store/TLDatabase';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';
import { TLEditItem } from './TLEditItem';
import { TLEditItemState } from './TLEditItemState';

import './tl-create-dialog.scss';

@observer
export class TLCreateDialog extends React.PureComponent {
  private readonly editState = new TLEditItemState();

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
        <TLEditItem editState={this.editState} />
      </TLDialog>
    );
  }

  private readonly handleCancel = () => {
    tlDialogsState.closeCreateDialog();
  };

  private readonly handleCreateItem = () => {
    tlDatabase.createTodo(this.editState.getEditedTodo());
    tlDialogsState.closeCreateDialog();
  };
}
