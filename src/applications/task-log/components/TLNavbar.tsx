import { observer } from 'mobx-react';
import React from 'react';

import { TaskLogState, TLScreen } from '../TaskLogState';
import { TLPanel } from './core/TLPanel';

import './tl-navbar.scss';

interface TLNProps {
  tlState: TaskLogState;
}

@observer
export class TLNavbar extends React.PureComponent<TLNProps> {
  public render() {
    const { tlState } = this.props;
    return (
      <TLPanel className={'tl-navbar'}>
        <div className={'tl-navbar__block top'}>
          <div
            className={this.getItemClass(TLScreen.DASH)}
            onClick={() => tlState.setScreen(TLScreen.DASH)}
          >
            DASH
          </div>
          <div
            className={this.getItemClass(TLScreen.TODO)}
            onClick={() => tlState.setScreen(TLScreen.TODO)}
          >
            TODO
          </div>
        </div>
        <div className={'tl-navbar__block mid'}>
          <div onClick={() => tlState.setCreateDialogOpen(true)}>CREATE</div>
        </div>
        <div className={'tl-navbar__block bot'}>
          <div
            className={this.getItemClass(TLScreen.SETTINGS)}
            onClick={() => tlState.setScreen(TLScreen.SETTINGS)}
          >
            SETTINGS
          </div>
        </div>
      </TLPanel>
    );
  }

  private getItemClass(item: TLScreen) {
    const { tlState } = this.props;
    return item === tlState.tlScreen ? 'item active' : 'item';
  }
}
