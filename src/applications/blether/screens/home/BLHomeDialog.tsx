import { observer } from 'mobx-react';
import React from 'react';

import { BLHomeDialogForm, BLHomeDialogState } from './BLHomeDialogState';
import { BLHomeForm } from './BLHomeForm';
import { BLHostForm } from './BLHostForm';

import './bl-home-dialog.scss';
import { BLJoinForm } from './BLJoinForm';

@observer
export class BLHomeDialog extends React.PureComponent {
  private readonly homeState = new BLHomeDialogState();

  public render() {
    let form: JSX.Element;
    switch (this.homeState.form) {
      case BLHomeDialogForm.HOME:
        form = (
          <BLHomeForm
            onHost={() => this.homeState.setHomeForm(BLHomeDialogForm.HOST)}
            onJoin={() => this.homeState.setHomeForm(BLHomeDialogForm.JOIN)}
          />
        );
        break;
      case BLHomeDialogForm.HOST:
        form = <BLHostForm toHome={() => this.homeState.setHomeForm(BLHomeDialogForm.HOME)} />;
        break;
      case BLHomeDialogForm.JOIN:
        form = <BLJoinForm toHome={() => this.homeState.setHomeForm(BLHomeDialogForm.HOME)} />;
    }

    return (
      <div className={'bl-home-dialog'}>
        <div className={'logo'}>blether</div>
        <div className={'form'}>{form}</div>
      </div>
    );
  }
}
