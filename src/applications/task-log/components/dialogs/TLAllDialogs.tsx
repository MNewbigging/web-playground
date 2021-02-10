import { observer } from 'mobx-react';
import React from 'react';

import { TLCreateDialog } from './TLCreateDialog';
import { TLDetailsDialog } from './TLDetailsDialog';
import { DialogState, tlDialogsState } from './TLDialogsState';

@observer
export class TLAllDialogs extends React.PureComponent {
  public render() {
    return (
      <>
        {tlDialogsState.createDialogState !== DialogState.CLOSED && this.renderCreateDialog()}
        {tlDialogsState.detailsDialogState !== DialogState.CLOSED && this.renderDetailsDialog()}
      </>
    );
  }

  private renderCreateDialog() {
    return <TLCreateDialog />;
  }

  private renderDetailsDialog() {
    return <TLDetailsDialog todo={tlDialogsState.detailsTodo} />;
  }
}
