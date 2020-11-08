import React from 'react';

import { ActiveWordZone } from '../game/ActiveWordZone';
import { WordBashState } from '../WordBashState';
import { LetterPool } from './LetterPool';

import './wb-game.scss';

interface WBGameProps {
  wbState: WordBashState;
}

export class WBGame extends React.Component<WBGameProps> {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }
  public render() {
    const { wbState } = this.props;
    return (
      <div className={'wb-game'}>
        <LetterPool wbState={wbState} />
        <ActiveWordZone wbState={wbState} />
      </div>
    );
  }

  private onKeyPressed = (evt: KeyboardEvent) => {
    this.props.wbState.pressKey(evt.key);
  };
}
