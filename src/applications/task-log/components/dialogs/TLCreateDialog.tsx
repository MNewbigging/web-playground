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
    return (
      <TLDialog
        state={this.props.tlState.createDialogState}
        title={'CREATE_ITEM'}
        onCancel={this.handleCancel}
        onAccept={this.handleCreateItem}
      >
        <TLCreateItem ciState={this.ciState} />
      </TLDialog>
    );
  }

  private readonly handleCancel = () => {
    const { tlState } = this.props;
    tlState.closeCreateDialog();
    this.ciState = new TLCreateItemState();
    this.resizeTextArea();
  };

  private readonly handleCreateItem = () => {
    this.ciState.createTodoItem();
    this.ciState = new TLCreateItemState();
    this.resizeTextArea();
  };

  private resizeTextArea() {
    document.getElementById('desc-text-area').style.height = '30px';
  }
}
