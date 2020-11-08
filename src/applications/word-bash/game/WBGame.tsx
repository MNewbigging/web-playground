import React from 'react';

import { WordBashState } from '../WordBashState';
import { LetterPool } from './LetterPool';

import './wb-game.scss';

interface WBGameProps {
  wbState: WordBashState;
}

export class WBGame extends React.Component<WBGameProps> {
  public render() {
    const { wbState } = this.props;
    return (
      <div className={'wb-game'}>
        <LetterPool wbState={wbState} />
      </div>
    );
  }
}