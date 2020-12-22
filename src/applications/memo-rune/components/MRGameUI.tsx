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

    const scoresToRender: JSX.Element = mrState.gameState?.winner
      ? this.renderEndGameScores()
      : this.renderInGameScores();

    return (
      <div key={'mr-ui'} className={'mr-ui'}>
        <div className={'button-outer'}>
          <div className={'button'} onClick={() => mrState.pauseGame()}>
            <Icon icon={'menu'} iconSize={24} />
          </div>
        </div>
        {scoresToRender}
      </div>
    );
  }

  private renderInGameScores() {
    const { gameState } = this.props.mrState;
    let p1class = 'scores';
    let p2class = 'scores';
    gameState?.p1Turn ? (p1class += ' current-turn') : (p2class += ' current-turn');

    return (
      <div className={'scores-outer'}>
        <div className={p1class}>
          {`P1: ${gameState?.p1Pairs} `}
          <span className={'negative-score'}>{`(-${gameState?.p1DangerRunes})`}</span>
        </div>
        {gameState?.playerCount === 2 && (
          <div className={p2class}>
            {`P2: ${gameState?.p2Pairs} `}
            <span className={'negative-score'}>{`(-${gameState?.p2DangerRunes})`}</span>
          </div>
        )}
      </div>
    );
  }

  private renderEndGameScores() {
    const { gameState } = this.props.mrState;
    let p1class = 'scores';
    let p2class = 'scores';
    gameState?.winner === 1
      ? (p1class += ' current-turn winner')
      : (p2class += ' current-turn winner');
    const p1score = gameState.p1Pairs - gameState.p1DangerRunes;
    const p2score = gameState.p2Pairs - gameState.p2DangerRunes;

    return (
      <div className={'scores-outer'}>
        <div className={p1class}>{`P1: ${p1score} `}</div>
        {gameState?.playerCount === 2 && <div className={p2class}>{`P2: ${p2score}`}</div>}
      </div>
    );
  }
}
