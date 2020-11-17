import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../fixed';
import { WordBashState } from '../WordBashState';
import { LetterTile } from './LetterTile';

import './letter-pool.scss';

interface LetterPoolProps {
  wbState: WordBashState;
}

@observer
export class LetterPool extends React.Component<LetterPoolProps> {
  public render() {
    const { wbState } = this.props;
    const letters: JSX.Element[] = []; // the letters to display in pool

    // If game is won, don't show normal letters - show winning message letters
    if (wbState.wonGame) {
      this.addGameScore(letters);
    } else {
      // End game animations
      const anims: string = wbState.startWinAnims ? 'pulse-flyout' : '';

      wbState.letterPool.forEach((letter, idx) => {
        letters.push(<LetterTile key={'lt-' + idx} {...letter} anims={anims} />);
      });
    }

    return <div className={'letter-pool'}>{letters}</div>;
  }

  private addGameScore(letters: JSX.Element[]) {
    const { wbState } = this.props;
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

    const winMsg: string[] = ['Y', 'O', 'U', ' ', 'W', 'O', 'N', '!'];
    winMsg.forEach((char, idx) => {
      const lt: ILetterTile = {
        letter: char,
        status: LetterTileStatus.NORMAL,
        delay: 0.1 * idx, // 2 should actually be 0.5 per row
      };
      letters.push(<LetterTile key={'lt' + idx} {...lt} outerClass={'win-msg'} />);
    });
  }
}
