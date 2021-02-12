import { observer } from 'mobx-react';
import React from 'react';

import { Todo } from '../../model/TLTodo';
import { tlDatabase } from '../../store/TLDatabase';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';
import { TLEditItem } from './TLEditItem';
import { TLEditItemState } from './TLEditItemState';

import './tl-edit-dialog.scss';

interface EditDialogProps {
  todo?: Todo;
}

@observer
export class TLEditDialog extends React.PureComponent<EditDialogProps> {
  private readonly editState = new TLEditItemState(this.props.todo);
  public render() {
    const { todo } = this.props;
    return (
      <TLDialog
        state={tlDialogsState.editDialogState}
        title={'EDIT_ITEM'}
        onCancel={() => tlDialogsState.closeEditDialog()}
        onAccept={this.onEditItem}
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
    return <TLEditItem editState={this.editState} />;
  }

  private readonly onEditItem = () => {
    const todo = this.editState.getEditedTodo();
    console.log('after edit dto: ', todo);
    tlDatabase.updateTodo(todo);
  };
}
