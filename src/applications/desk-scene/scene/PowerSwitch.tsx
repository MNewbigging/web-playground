import React from 'react';

import { observer } from 'mobx-react';

import { DeskSceneState } from '../DeskSceneState';

import './power-switch.scss';

interface PWProps {
  whState: DeskSceneState;
}

@observer
export class PowerSwitch extends React.Component<PWProps> {
  public render() {
    const { whState } = this.props;
    const powerOn: string = whState.computerOn ? 'on' : 'off';

    return (
      <div className={'power-switch'}>
        <div className={'button-area ' + powerOn}>
          <div className={'button'} onClick={this.onPowerSwitchClick}></div>
        </div>

        <div className={'button-symbols'}>
          <div>0</div>
          <div>1</div>
        </div>
      </div>
    );
  }

  private onPowerSwitchClick = () => {
    const { whState } = this.props;
    whState.toggleComputerPower();
  };
}
