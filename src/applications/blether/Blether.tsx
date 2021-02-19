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
    console.log('blether render');

    let screen: JSX.Element;
    if (this.bState.bScreen === BletherScreen.HOME) {
      screen = <BLHomeDialog />;
    } else {
      switch (this.bState.viewMode) {
        case BletherViewMode.DESKTOP:
          screen = <BLChatDesktop />;
          break;
        case BletherViewMode.MOBILE:
          screen = <BLChatMobile />;
          break;
      }
    }

    return (
      <div className={'blether-app'}>
        <div className={'overlay'}></div>
        {screen}
      </div>
    );
  }

  private readonly onResizeWindow = () => {
    this.bState.checkViewMode(window.innerWidth);
  };
}
