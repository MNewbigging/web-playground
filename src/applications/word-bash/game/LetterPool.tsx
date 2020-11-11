import React from 'react';

import { observer } from 'mobx-react';

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
    wbState.letterPool.forEach((letter, idx) => {
      // set delay for animation
      const delay = 0.1 * idx;
      letters.push(<LetterTile key={'lt-' + idx} {...letter} animDelay={delay} />);
    });

    return <div className={'letter-pool'}>{letters}</div>;
  }
}
