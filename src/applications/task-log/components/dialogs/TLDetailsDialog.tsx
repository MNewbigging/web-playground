import { observer } from 'mobx-react';

import React from 'react';

import { Todo } from '../../model/TLTodo';
import { TLItemDetails } from '../TLItemDetails';
import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

import './tl-details-dialog.scss';

interface TLDDProps {
  todo?: Todo;
}

@observer
export class TLDetailsDialog extends React.PureComponent<TLDDProps> {
  public render() {
    const { todo } = this.props;
    return (
      <TLDialog
        state={tlDialogsState.detailsDialogState}
        title={'ITEM_DETAILS'}
        onCancel={() => tlDialogsState.closeDetailsDialog()}
        cancelText={'CLOSE'}
        onAccept={() => tlDialogsState.openEditdialog(todo)}
        acceptText={'EDIT'}
        className={'details-dialog'}
        keepOpen
      >
        {todo === undefined ? this.renderNoTodo() : this.renderTodoDetails(todo)}
      </TLDialog>
    );
  }

  private renderNoTodo() {
    return <div>Oops, something went wrong!</div>;
  }

  private renderTodoDetails(todo: Todo) {
    return (
      <div className={'details-dialog-children'}>
        <TLItemDetails todo={todo} />
      </div>
    );
  }
}
