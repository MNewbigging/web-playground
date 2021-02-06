import React from 'react';

import { TLPanel } from '../../core/TLPanel';

import './tl-dash.scss';

export class TLDash extends React.PureComponent {
  public render() {
    return (
      <div className={'tl-dashboard'}>
        <TLPanel className={'tracked-items'}>
          <div>TRACKED ITEMS</div>
        </TLPanel>
      </div>
    );
  }
}
