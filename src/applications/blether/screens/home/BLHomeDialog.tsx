import { observer } from 'mobx-react';
import React from 'react';

import { BletherState } from '../../BletherState';
import { BLHomeDialogForm } from './BLHomeDialogState';
import { BLHomeForm } from './BLHomeForm';
import { BLHostForm } from './BLHostForm';
import { BLJoinForm } from './BLJoinForm';

import './bl-home-dialog.scss';

interface HomeProps {
  bState: BletherState;
  toApp: () => void;
}

@observer
export class BLHomeDialog extends React.PureComponent<HomeProps> {
  public render() {
    const { bState, toApp } = this.props;

    let form: JSX.Element;
    switch (bState.homeState.form) {
      case BLHomeDialogForm.HOME:
        form = (
          <BLHomeForm
            onHost={() => bState.homeState.setHomeForm(BLHomeDialogForm.HOST)}
            onJoin={() => bState.homeState.setHomeForm(BLHomeDialogForm.JOIN)}
            onExit={toApp}
          />
        );
        break;
      case BLHomeDialogForm.HOST:
        form = (
          <BLHostForm
            toHome={() => {
              bState.homeState.setHomeForm(BLHomeDialogForm.HOME);
              bState.homeState.clearFields();
            }}
            name={bState.homeState.name}
            onNameChange={(name: string) => bState.homeState.setName(name)}
            onHost={(name: string) => bState.hostChat(name)}
          />
        );
        break;
      case BLHomeDialogForm.JOIN:
        form = (
          <BLJoinForm
            toHome={this.onBackFromJoin}
            name={bState.homeState.name}
            onNameChange={(name: string) => bState.homeState.setName(name)}
            joinId={bState.homeState.joinId}
            onJoinIdChange={(id: string) => bState.homeState.setJoinId(id)}
            onJoin={(name: string, id: string) => bState.joinChat(name, id)}
            joining={bState.joining}
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

  private readonly onBackFromJoin = () => {
    const { bState } = this.props;
    bState.homeState.setHomeForm(BLHomeDialogForm.HOME);
    bState.homeState.clearFields();
    bState.cancelJoin();
  };
}
