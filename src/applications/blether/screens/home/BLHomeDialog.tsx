import React from 'react';

import { BLHomeDialogState, BLHomeDialogForm } from './BLHomeDialogState';
import { BLHomeForm } from './BLHomeForm';

import './bl-home-dialog.scss';

// will need props from state for callbacks

export class BLHomeDialog extends React.PureComponent {
  private readonly homeState = new BLHomeDialogState();

  public render() {
    let form: JSX.Element;
    switch (this.homeState.form) {
      case BLHomeDialogForm.HOME:
        form = <BLHomeForm />;
    }

    return (
      <div className={'bl-home-dialog'}>
        <div className={'logo'}>blether</div>
        <div className={'form'}>{form}</div>
      </div>
    );
  }
}
