import React from 'react';

import { WordBashState } from '../WordBashState';
import { LetterTile } from './LetterTile';

import './letter-pool.scss';

interface LetterPoolProps {
  wbState: WordBashState;
}

export class LetterPool extends React.Component<LetterPoolProps> {
  public render() {
    const { wbState } = this.props;
    const letters: JSX.Element[] = [];
    wbState.letterPool.forEach((letter) => {
      letters.push(
        <LetterTile {...letter} />
      );
    });

    return (
      <div className={'letter-pool'}>
        {letters}
      </div>
    );
  }
}