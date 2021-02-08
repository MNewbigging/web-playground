import { observer } from 'mobx-react';
import React from 'react';

import { TLList } from '../../core/list/TLList';
import { TLPanel } from '../../core/TLPanel';
import { TLDashState } from './TLDashState';

import './tl-dash.scss';

interface DashProps {
  dashState: TLDashState;
}

@observer
export class TLDash extends React.PureComponent<DashProps> {
  public render() {
    const { dashState } = this.props;
    return (
      <div className={'tl-dashboard'}>
        <TLPanel className={'tracked-items'} title={'TRACKED_ITEMS'}>
          <TLList items={dashState.trackedTodos} />
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
