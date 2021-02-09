import { observer } from 'mobx-react';
import React from 'react';

import { TLList } from '../../core/list/TLList';
import { TLPanel } from '../../core/TLPanel';
import { tlDialogsState } from '../../dialogs/TLDialogsState';
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
          <TLList
            items={dashState.trackedTodos}
            onItemSelect={() => tlDialogsState.openDetailsDialog()}
          />
        </TLPanel>
        <TLPanel className={'stats'} title={'STATS'}></TLPanel>
        <TLPanel className={'recent'} title={'RECENT_ITEMS'}>
          <TLList
            items={dashState.recentTodos}
            onItemSelect={() => tlDialogsState.openDetailsDialog()}
          />
        </TLPanel>
        <TLPanel className={'timeline'} title={'TIMELINE'}></TLPanel>
      </div>
    );
  }
}
