import { observer } from 'mobx-react';
import React from 'react';

import { TLCreateDialog } from './TLCreateDialog';
import { TLDetailsDialog } from './TLDetailsDialog';
import { DialogState, tlDialogsState } from './TLDialogsState';
import { TLEditDialog } from './TLEditDialog';

@observer
export class TLAllDialogs extends React.PureComponent {
  public render() {
    return (
      <>
        {tlDialogsState.createDialogState !== DialogState.CLOSED && this.renderCreateDialog()}
        {tlDialogsState.detailsDialogState !== DialogState.CLOSED && this.renderDetailsDialog()}
        {tlDialogsState.editDialogState !== DialogState.CLOSED && this.renderEditDialog()}
      </>
    );
  }

  private renderCreateDialog() {
    return <TLCreateDialog />;
  }

  private renderDetailsDialog() {
    return <TLDetailsDialog todo={tlDialogsState.detailsTodo} />;
  }

  private renderEditDialog() {
    return <TLEditDialog todo={tlDialogsState.editTodo} />;
  }
}
