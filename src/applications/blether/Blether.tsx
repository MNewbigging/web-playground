import { observer } from 'mobx-react';
import React from 'react';

import { BletherScreen, BletherState, BletherViewMode } from './BletherState';
import { BLHomeDialog } from './screens/home/BLHomeDialog';

import './blether.scss';
import { BLChatDesktop } from './screens/chat/desktop/BLChatDesktop';
import { BLChatMobile } from './screens/chat/mobile/BLChatMobile';

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
    console.log('blether render: ', this.bState.participant?.ready);
    if (this.bState.bScreen === BletherScreen.HOME || !this.bState.participant.ready) {
      screen = (
        <BLHomeDialog
          onHost={(name: string) => this.bState.hostChat(name)}
          onJoin={(name: string, id: string) => this.bState.joinChat(name, id)}
        />
      );
    } else {
      switch (this.bState.viewMode) {
        case BletherViewMode.DESKTOP:
          screen = <BLChatDesktop participant={this.bState.participant} />;
          break;
        case BletherViewMode.MOBILE:
          screen = <BLChatMobile />;
          break;
      }
    }

    return <div className={'blether-app'}>{screen}</div>;
  }

  private readonly onResizeWindow = () => {
    this.bState.checkViewMode(window.innerWidth);
  };
}
