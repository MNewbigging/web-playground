import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../../model/TLTodo';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

import './tl-edit-dialog.scss';

interface EditDialogProps {
  todo?: ITodo;
}

@observer
export class TLEditDialog extends React.PureComponent<EditDialogProps> {
  public render() {
    const { todo } = this.props;
    return (
      <TLDialog
        state={tlDialogsState.editDialogState}
        title={'EDIT_ITEM'}
        onCancel={() => tlDialogsState.closeEditDialog()}
        className={'edit-dialog'}
      >
        {todo === undefined ? this.renderNoTodo() : this.renderEditItem()}
      </TLDialog>
    );
  }

  private renderNoTodo() {
    return <div>Oops, something went wrong!</div>;
  }

  private renderEditItem() {
    return <div>EDIT ITEM</div>;
  }
}
