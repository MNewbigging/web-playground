import React from 'react';

import { observer } from 'mobx-react';

import { WBMenu } from './menu/WBMenu';
import { WBScreen, WordBashState } from './WordBashState';

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
        toRender = <div>GAME</div>;
        break;
    }


    return (
      <div className={'word-bash'}>
        {toRender}
      </div>
    );
  }
}