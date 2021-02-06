import { observer } from 'mobx-react';
import React from 'react';

import { TaskLogState, TLScreen } from '../TaskLogState';
import { TLPanel } from './core/TLPanel';
import { TLButton, TLButtonIntent } from './core/TLButton';

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
          <TLButton
            intent={TLButtonIntent.NEUTRAL}
            text={'DASH'}
            onClick={() => tlState.setScreen(TLScreen.DASH)}
            className={this.getActiveItemClass(TLScreen.DASH) + ' dash'}
          />
          <TLButton
            intent={TLButtonIntent.NEUTRAL}
            text={'TODO'}
            onClick={() => tlState.setScreen(TLScreen.TODO)}
            className={this.getActiveItemClass(TLScreen.TODO)}
          />
        </div>
        <div className={'tl-navbar__block mid'}>
          <TLButton
            intent={TLButtonIntent.NEUTRAL}
            text={'CREATE'}
            onClick={() => tlState.openCreateDialog()}
          />
        </div>
        <div className={'tl-navbar__block bot'}>
          <TLButton
            intent={TLButtonIntent.NEUTRAL}
            text={'SETTINGS'}
            className={this.getActiveItemClass(TLScreen.SETTINGS)}
            onClick={() => tlState.setScreen(TLScreen.SETTINGS)}
          />
        </div>
      </TLPanel>
    );
  }

  private getActiveItemClass(item: TLScreen) {
    const { tlState } = this.props;
    return item === tlState.tlScreen ? 'active' : '';
  }
}
