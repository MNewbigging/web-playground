import { observer } from 'mobx-react';

import React from 'react';

import { ITodo } from '../../model/TLTodo';
import { TLItemDetails } from '../TLItemDetails';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

import './tl-details-dialog.scss';

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
        className={'details-dialog'}
      >
        {todo === undefined ? this.renderNoTodo() : this.renderTodoDetails(todo)}
      </TLDialog>
    );
  }

  private renderNoTodo() {
    return <div>Oops, something went wrong!</div>;
  }

  private renderTodoDetails(todo: ITodo) {
    return (
      <div className={'details-dialog-children'}>
        <TLItemDetails todo={todo} />
      </div>
    );
  }

  private readonly handleCancel = () => {
    tlDialogsState.closeDetailsDialog();
  };
}
