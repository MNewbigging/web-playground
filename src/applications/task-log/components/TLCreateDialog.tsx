import { observer } from 'mobx-react';
import React from 'react';

import { TaskLogState } from '../TaskLogState';
import { TLDialog } from './core/TLDialog';

interface TLCDProps {
  tlState: TaskLogState;
}

@observer
export class TLCreateDialog extends React.PureComponent<TLCDProps> {
  public render() {
    const { tlState } = this.props;
    return (
      <TLDialog
        state={this.props.tlState.createDialogState}
        title={'CREATE_ITEM'}
        onCancel={() => tlState.closeCreateDialog()}
      >
        <div>Dialog children</div>
      </TLDialog>
    );
  }
}
