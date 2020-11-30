import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../fixed';
import { WBGameState } from '../WBGameState';
import { LetterTile } from './LetterTile';

import './letter-pool.scss';
import { parseConfigFileTextToJson } from 'typescript';

interface LetterPoolProps {
  gameState: WBGameState;
}

@observer
export class LetterPool extends React.Component<LetterPoolProps> {
  public render() {
    const { gameState } = this.props;
    const letters: JSX.Element[] = []; // the letters to display in pool

    // If game is won, don't show normal letters - show winning message letters
    if (gameState.wonGame) {
      this.addGameScore(letters);
    } else {
      this.addGameLetters(letters);
    }

    return <div className={'letter-pool'}>{letters}</div>;
  }

  private addGameScore(letters: JSX.Element[]) {
    const { gameState: wbState } = this.props;
    // Score text
    const scoreMsg: string[] = ['S', 'C', 'O', 'R', 'E', ':'];
    scoreMsg.forEach((char, idx) => {
      const lt: ILetterTile = {
        letter: char,
        status: LetterTileStatus.NORMAL,
        delay: 0.1 * idx,
      };
      letters.push(<LetterTile key={'slt' + idx} {...lt} outerClass={'score-msg'} />);
    });
    // Score numbers
    const score = wbState.gameScore.toString();
    // tslint:disable-next-line: prefer-for-of
    for (let i: number = 0; i < score.length; i++) {
      const lt: ILetterTile = {
        letter: score[i],
        status: LetterTileStatus.ACTIVE,
        delay: 0.1 * i,
      };
      letters.push(<LetterTile key={'sslt' + i} {...lt} outerClass={'score-msg'} />);
    }
  }

  private addGameLetters(letters: JSX.Element[]) {
    const { gameState } = this.props;
    // End game animations
    const anims: string = gameState.startWinAnims ? 'pulse-flyout' : '';
    gameState.letterPool.forEach((letter, idx) => {
      letters.push(
        <LetterTile
          key={'lt-' + idx}
          {...letter}
          anims={anims}
          select={() => gameState.selectLetterTile(idx)}
        />
      );
    });
  }
}
