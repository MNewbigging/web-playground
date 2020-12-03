import React from 'react';

import { observer } from 'mobx-react';

import { ComputerGUI } from '../game/ComputerGUI';
import { WordHackState } from '../WordHackState';
import { PowerSwitch } from './PowerSwitch';

import './computer.scss';

interface CProps {
  whState: WordHackState;
}

@observer
export class Computer extends React.Component<CProps> {
  public render() {
    const { whState } = this.props;
    const screenOn = whState.computerOn ? 'on' : 'off';
    const turningOff = whState.computerTurningOff ? ' turnoff' : '';
    const screenClasses: string[] = ['computer-screen', screenOn, turningOff];
    return (
      <>
        <div className={'computer'}>
          <div className={screenClasses.join(' ')}>
            <div className={'screenOffEffect'}></div>
            <ComputerGUI whState={whState} />
          </div>
        </div>
        <div className={'computer-base'}>
          <div className={'cb-front'}>
            <div className={'cb-grille'}></div>
            <PowerSwitch whState={whState} />
          </div>
        </div>
      </>
    );
  }
}
