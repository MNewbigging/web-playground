import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { MemoRuneState, MRScreen } from './MemoRuneState';
import { Rune } from './components/Rune';

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

    return <div className={'memo-rune'}>{toRender}</div>;
  }

  private renderMenu() {
    return (
      <div className={'mr-menu'}>
        <Button text={'Start'} onClick={() => this.mrState.startGame()} />
      </div>
    );
  }

  private renderGame() {
    const { gameState } = this.mrState;

    const runes: JSX.Element[] = [];

    gameState.runes.forEach((r) => {
      runes.push(<Rune rune={r} />);
    });

    return <div className={'rune-area'}>{runes}</div>;
  }
}
