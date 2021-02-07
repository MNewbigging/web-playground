import { observer } from 'mobx-react';

import React from 'react';

import { TaskLogState } from '../../TaskLogState';
import { TLDialog } from '../core/TLDialog';
import { TLCreateItem } from './TLCreateItem';
import { TLCreateItemState } from './TLCreateItemState';

interface TLCDProps {
  tlState: TaskLogState;
}

@observer
export class TLCreateDialog extends React.PureComponent<TLCDProps> {
  private ciState = new TLCreateItemState();
  public render() {
    const { tlState } = this.props;
    console.log('dialog render');
    return (
      <TLDialog
        state={this.props.tlState.createDialogState}
        title={'CREATE_ITEM'}
        onCancel={() => tlState.closeCreateDialog()}
        onAccept={this.handleCreateItem}
      >
        <TLCreateItem ciState={this.ciState} />
      </TLDialog>
    );
  }

  private readonly handleCreateItem = () => {
    this.ciState.createTodoItem();
    this.ciState = new TLCreateItemState();
    console.log('new ci state');
  };
}
