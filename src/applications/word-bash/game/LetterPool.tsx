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
    const letters: JSX.Element[] = [];
    const cName: string = wbState.wonGame ? 'pulse-flyout' : '';
    wbState.letterPool.forEach((letter, idx) => {
      letters.push(<LetterTile key={'lt-' + idx} {...letter} className={cName} />);
    });

    if (wbState.wonGame) {
      // Add game score letters
      this.addGameScore(letters);
    }

    return <div className={'letter-pool'}>{letters}</div>;
  }

  private addGameScore(letters: JSX.Element[]) {
    const msg: string[] = ['Y', 'O', 'U', ' ', 'W', 'O', 'N', '!'];
    msg.forEach((char, idx) => {
      const lt: ILetterTile = {
        letter: char,
        status: LetterTileStatus.NORMAL,
        delay: 0.1 * idx,
      };
      letters.push(<LetterTile key={'lt' + idx} {...lt} className={'win-msg fall-in'} />);
    });
  }
}
