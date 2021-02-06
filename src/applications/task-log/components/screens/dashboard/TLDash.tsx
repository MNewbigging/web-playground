import React from 'react';

import { TLPanel } from '../../core/TLPanel';

import './tl-dash.scss';

export class TLDash extends React.PureComponent {
  public render() {
    return (
      <div className={'tl-dashboard'}>
        <TLPanel className={'tracked-items'}>
          <div>TRACKED_ITEMS</div>
        </TLPanel>
        <TLPanel className={'stats'}>
          <div>STATS</div>
        </TLPanel>
        <TLPanel className={'recent'}>
          <div>RECENT_ITEMS</div>
        </TLPanel>
        <TLPanel className={'timeline'}>
          <div>TIMELINE</div>
        </TLPanel>
      </div>
    );
  }
}
