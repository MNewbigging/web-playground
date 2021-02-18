import React from 'react';

import './bl-home-dialog.scss';

// will need props from state for callbacks

export class BLHomeDialog extends React.PureComponent {
  // will need its own state class to track which dialog is shown
  public render() {
    return (
      <div className={'bl-home-dialog'}>
        <div className={'logo'}>blether</div>
        <div className={'form'}>{this.renderHomeForm()}</div>
      </div>
    );
  }

  // components for each form the dialog may show
  private renderHomeForm() {
    return (
      <div className={'home-form'}>
        <div></div>
      </div>
    );
  }
}
