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
    let p1class = 'scores';
    let p2class = 'scores';
    if (mrState.gameState?.p1Turn) {
      p1class += ' current-turn';
    } else {
      p2class += ' current-turn';
    }

    return (
      <div key={'mr-ui'} className={'mr-ui'}>
        <div className={'button-outer'}>
          <div className={'button'} onClick={() => mrState.pauseGame()}>
            <Icon icon={'menu'} iconSize={24} />
          </div>
        </div>
        <div className={'scores-outer'}>
          <div className={p1class}>
            {`P1: ${mrState.gameState?.p1Pairs} `}
            <span className={'negative-score'}>{`(-${mrState.gameState?.p1DangerRunes})`}</span>
          </div>
          {mrState.gameState?.playerCount === 2 && (
            <div className={p2class}>
              {`P2: ${mrState.gameState?.p2Pairs} `}
              <span className={'negative-score'}>{`(-${mrState.gameState?.p2DangerRunes})`}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
