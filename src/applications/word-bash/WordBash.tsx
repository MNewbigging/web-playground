import React from 'react';

import { observer } from 'mobx-react';

import { WBScreen } from './fixed';
import { WBGame } from './game/WBGame';
import { WBMenu } from './menu/WBMenu';
import { WordBashState } from './WordBashState';

import './word-bash.scss';

@observer
export class WordBash extends React.Component {
  private wbState = new WordBashState();
  public render() {
    let toRender: JSX.Element;
    switch (this.wbState.wbScreen) {
      case WBScreen.MENU:
        toRender = <WBMenu wbState={this.wbState} />;
        break;
      case WBScreen.GAME:
        toRender = <WBGame wbState={this.wbState} />;
        break;
    }

    return <div className={'word-bash'}>{toRender}</div>;
  }
}
