import React from 'react';

import { observer } from 'mobx-react';

import { Icon } from '@blueprintjs/core';

import { MemoRuneState } from '../MemoRuneState';

import './mr-game-ui.scss';

interface UIProps {
  mrState: MemoRuneState;
}

@observer
export class MRGameUI extends React.Component<UIProps> {
  public render() {
    const { mrState } = this.props;

    return (
      <div key={'mr-ui'} className={'mr-ui'}>
        <div className={'button-outer'}>
          <div className={'button'} onClick={() => mrState.pauseGame()}>
            <Icon icon={'menu'} iconSize={24} />
          </div>
        </div>
        <div className={'scores-outer'}>
          <div
            className={'scores'}
          >{`P1: ${mrState.gameState?.p1Pairs} (-${mrState.gameState?.p1DangerRunes})`}</div>
          {mrState.gameState?.playerCount === 2 && (
            <div
              className={'scores'}
            >{`P2: ${mrState.gameState?.p1Pairs} (-${mrState.gameState?.p2DangerRunes})`}</div>
          )}
        </div>
      </div>
    );
  }
}
