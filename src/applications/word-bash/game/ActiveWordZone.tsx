import React from 'react';

import { observer } from 'mobx-react';

import { Icon } from '@blueprintjs/core';

import { WBGameState } from '../WBGameState';
import { AnswerLetterTile } from './AnswerLetterTile';

import './active-word-zone.scss';

interface AWZProps {
  gameState: WBGameState;
}

@observer
export class ActiveWordZone extends React.Component<AWZProps> {
  public render() {
    const { gameState } = this.props;
    const letters: JSX.Element[] = [];
    gameState.lastPickedLetters.forEach((lpl, idx) => {
      const iletter = gameState.letterPool[lpl];
      letters.push(
        <AnswerLetterTile
          key={'at-' + idx}
          letter={iletter.letter}
          select={() => gameState.undoLetterTile(idx)}
        />
      );
    });

    let alertClassName = gameState.rightAnswer ? 'correct' : '';
    alertClassName = gameState.wrongAnswer ? 'warning' : alertClassName;

    return (
      <div className={'active-word-zone ' + alertClassName}>
        <div className={'letters'}>{letters}</div>

        <div className={'enter-icon'} onClick={() => gameState.checkWord()}>
          <Icon icon={'caret-right'} iconSize={24} />
        </div>
      </div>
    );
  }
}
