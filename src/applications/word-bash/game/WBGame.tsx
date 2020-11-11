import React from 'react';

import { ActiveWordZone } from '../game/ActiveWordZone';
import { WordBashState } from '../WordBashState';
import { AnswerWordZone } from './AnswerWordZone';
import { LetterPool } from './LetterPool';
import { InGameMenu } from './InGameMenu';

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
        <div className={'wb-game__left'}>
          <div className={'wbg-left-top'}>
            <InGameMenu />
          </div>
          <div className={'wbg-left-bot'}>
            <div className={'wbg-lb-top'}>
              <LetterPool wbState={wbState} />
            </div>
            <div className={'wbg-lb-bot'}>
              <ActiveWordZone wbState={wbState} />
            </div>
          </div>
        </div>
        <div className={'wb-game__right'}>
          <AnswerWordZone wbState={wbState} />
        </div>
      </div>
    );
  }

  private onKeyPressed = (evt: KeyboardEvent) => {
    this.props.wbState.pressKey(evt.key);
  };
}
