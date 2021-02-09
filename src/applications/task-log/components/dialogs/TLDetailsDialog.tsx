import { observer } from 'mobx-react';

import React from 'react';

import { ITodo } from '../../model/TLTodo';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

interface TLDDProps {
  todo?: ITodo;
}

@observer
export class TLDetailsDialog extends React.PureComponent<TLDDProps> {
  public render() {
    const { todo } = this.props;
    return (
      <TLDialog
        state={tlDialogsState.detailsDialogState}
        title={'ITEM_DETAILS'}
        onCancel={this.handleCancel}
      >
        {todo === undefined ? this.renderNoTodo() : this.renderTodoDetails(todo)}
      </TLDialog>
    );
  }

  private renderNoTodo() {
    return <div>Oops, something went wrong!</div>;
  }

  private renderTodoDetails(todo: ITodo) {
    return <div>DETAILS FOR TODO: {todo.title} </div>;
  }

  private readonly handleCancel = () => {
    tlDialogsState.closeDetailsDialog();
  };
}
