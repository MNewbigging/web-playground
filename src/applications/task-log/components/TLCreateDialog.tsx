import { observer } from 'mobx-react';
import React from 'react';

import { TLDialog } from './core/TLDialog';
import { TaskLogState } from '../TaskLogState';

interface TLCDProps {
  tlState: TaskLogState;
}

@observer
export class TLCreateDialog extends React.PureComponent<TLCDProps> {
  public render() {
    return (
      <TLDialog open={this.props.tlState.createDialogOpen}>
        <div>Dialog children</div>
      </TLDialog>
    );
  }
}
