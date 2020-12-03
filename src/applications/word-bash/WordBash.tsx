import React from 'react';

import { observer } from 'mobx-react';

import { WBScreen } from './fixed';
import { WBGame } from './game/WBGame';
import { WBMenu } from './menu/WBMenu';
import { WBOptions } from './menu/WBOptions';
import { WordBashState } from './WordBashState';

import './word-bash.scss';

interface WBProps {
  toApp: () => void;
}

@observer
export class WordBash extends React.Component<WBProps> {
  private wbState = new WordBashState();

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }

  public render() {
    const { toApp } = this.props;

    let toRender: JSX.Element;
    switch (this.wbState.wbScreen) {
      case WBScreen.MENU:
        toRender = <WBMenu wbState={this.wbState} toApp={toApp} />;
        break;
      case WBScreen.GAME:
        toRender = <WBGame gameState={this.wbState.gameState} pauseGame={this.wbState.pauseGame} />;
        break;
      case WBScreen.OPTIONS:
        toRender = <WBOptions wbState={this.wbState} />;
        break;
    }

    return <div className={'word-bash'}>{toRender}</div>;
  }

  private onKeyPressed = (evt: KeyboardEvent) => {
    this.wbState.pressKey(evt.key);
  };
}
