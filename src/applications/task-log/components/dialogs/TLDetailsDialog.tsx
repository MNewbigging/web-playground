import { observer } from 'mobx-react';

import React from 'react';

import { TLDialog } from './TLDialog';
import { tlDialogsState } from './TLDialogsState';

@observer
export class TLDetailsDialog extends React.PureComponent {
  public render() {
    return (
      <TLDialog
        state={tlDialogsState.detailsDialogState}
        title={'ITEM_DETAILS'}
        onCancel={this.handleCancel}
      >
        <div>I'm the details</div>
      </TLDialog>
    );
  }

  private readonly handleCancel = () => {
    tlDialogsState.closeDetailsDialog();
  };
}
