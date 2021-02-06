import React from 'react';

import { TaskLogState } from '../TaskLogState';
import { TLPanel } from './core/TLPanel';

import './tl-navbar.scss';

interface TLNProps {
  tlState: TaskLogState;
}

export class TLNavbar extends React.PureComponent<TLNProps> {
  public render() {
    return (
      <TLPanel className={'tl-navbar'}>
        <div className={'tl-navbar__block top'}>
          <div className={'item'}>DASH</div>
          <div className={'item'}>TODO</div>
        </div>
        <div className={'tl-navbar__block mid'}>
          <div>CREATE</div>
        </div>
        <div className={'tl-navbar__block bot'}>
          <div>SETTINGS</div>
        </div>
      </TLPanel>
    );
  }
}
