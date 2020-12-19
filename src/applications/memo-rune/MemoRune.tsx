import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { MemoRuneState, MRScreen } from './MemoRuneState';
import { Rune } from './components/Rune';
import { MRGameUI } from './components/MRGameUI';
import { MRMenu } from './components/MRMenu';

import './memo-rune.scss';

interface MRProps {
  toApp: () => void;
}

@observer
export class MemoRune extends React.Component<MRProps> {
  private mrState = new MemoRuneState();
  public render() {
    const toRender: JSX.Element[] = [];

    switch (this.mrState.mrScreen) {
      case MRScreen.MENU:
        toRender.push(this.renderMenu());
        break;
      case MRScreen.GAME:
        toRender.push(this.renderGame());
        break;
    }

    return (
      <div key={'memo-rune'} className={'memo-rune'}>
        {toRender}
      </div>
    );
  }

  private renderMenu() {
    return (
      <MRMenu mrState={this.mrState} />
      // <div key={'mr-menu'} className={'mr-menu'}>
      //   <Button key={'start-btn'} text={'Start'} onClick={() => this.mrState.startGame()} />
      // </div>
    );
  }

  private renderGame() {
    const { gameState } = this.mrState;

    const runes: JSX.Element[] = [];

    gameState.runes.forEach((r) => {
      runes.push(<Rune key={r.posX + r.posY} rune={r} />);
    });

    return (
      <React.Fragment key={'container'}>
        <div key={'left-panel'} className={'left-panel'}>
          {this.renderPlayerPanel()}
        </div>
        <div key={'rune-area'} className={'rune-area'}>
          {runes}
        </div>
      </React.Fragment>
    );
  }

  // Player panel is the panel to left of rune area
  private renderPlayerPanel() {
    return (
      <React.Fragment key={'player-panel'}>
        <div className={'ui-bar'}>
          <MRGameUI />
        </div>
        <div className={'danger-runes'}></div>
        <div className={'rune-pairs'}></div>
      </React.Fragment>
    );
  }
}
