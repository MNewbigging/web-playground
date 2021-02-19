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
        form = (
          <BLHostForm
            toHome={() => this.homeState.setHomeForm(BLHomeDialogForm.HOME)}
            name={this.homeState.name}
            onNameChange={(name: string) => this.homeState.setName(name)}
            onHost={this.onHost}
          />
        );
        break;
      case BLHomeDialogForm.JOIN:
        form = (
          <BLJoinForm
            toHome={() => this.homeState.setHomeForm(BLHomeDialogForm.HOME)}
            name={this.homeState.name}
            onNameChange={(name: string) => this.homeState.setName(name)}
            joinId={this.homeState.joinId}
            onJoinIdChange={(id: string) => this.homeState.setJoinId(id)}
          />
        );
    }

    return (
      <div className={'bl-home-dialog'}>
        <div className={'logo'}>blether</div>
        <div className={'form'}>{form}</div>
      </div>
    );
  }

  private readonly onHost = () => {
    // Check if valid name was given
    if (this.homeState.nameIsValid()) {
      // start chat
    } else {
      // shake input
    }
  };
}
