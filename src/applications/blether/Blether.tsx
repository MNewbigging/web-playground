import { observer } from 'mobx-react';
import React from 'react';

import { BletherScreen, BletherState, BletherViewMode } from './BletherState';
import { BLChatDesktop } from './screens/chat/desktop/BLChatDesktop';
import { BLChatMobile } from './screens/chat/mobile/BLChatMobile';
import { BLHomeDialog } from './screens/home/BLHomeDialog';

import './blether.scss';
import { BLChatState } from './screens/chat/BLChatState';

@observer
export class Blether extends React.PureComponent {
  private readonly bState = new BletherState();

  componentDidMount() {
    window.onresize = this.onResizeWindow;
  }

  componentWillUnmount() {
    window.onresize = undefined;
  }

  public render() {
    let screen: JSX.Element;

    if (this.bState.bScreen === BletherScreen.HOME || !this.bState.participant?.ready) {
      screen = <BLHomeDialog bState={this.bState} />;
    } else {
      if (this.bState.chatState === undefined && this.bState.participant) {
        this.bState.chatState = new BLChatState(this.bState.participant);
      }

      switch (this.bState.viewMode) {
        case BletherViewMode.DESKTOP:
          screen = (
            <BLChatDesktop
              participant={this.bState.participant}
              chatState={this.bState.chatState}
              onExit={() => this.bState.exitChat()}
            />
          );
          break;
        case BletherViewMode.MOBILE:
          screen = (
            <BLChatMobile
              participant={this.bState.participant}
              chatState={this.bState.chatState}
              onExit={() => this.bState.exitChat()}
            />
          );
          break;
      }
    }

    return <div className={'blether-app'}>{screen}</div>;
  }

  private readonly onResizeWindow = () => {
    this.bState.checkViewMode(window.innerWidth);
  };
}
