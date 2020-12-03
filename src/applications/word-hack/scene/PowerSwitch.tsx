import React from 'react';

import { observer } from 'mobx-react';

import { WordHackState } from '../WordHackState';

import './power-switch.scss';

interface PWProps {
  whState: WordHackState;
}

@observer
export class PowerSwitch extends React.Component<PWProps> {
  public render() {
    const { whState } = this.props;
    const powerOn: string = whState.computerOn ? 'on' : 'off';

    return (
      <div className={'power-switch ' + powerOn}>
        <div className={'button'} onClick={this.onPowerSwitchClick}></div>
      </div>
    );
  }

  private onPowerSwitchClick = () => {
    const { whState } = this.props;
    whState.toggleComputerPower();
  };
}
