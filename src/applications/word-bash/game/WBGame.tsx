import React from 'react';

import { ActiveWordZone } from '../game/ActiveWordZone';
import { WBGameState } from '../WBGameState';
import { AnswerWordZone } from './AnswerWordZone';
import { InGameMenu } from './InGameMenu';
import { LetterPool } from './LetterPool';

import './wb-game.scss';

interface WBGameProps {
  gameState: WBGameState;
  pauseGame: () => void;
}

export class WBGame extends React.Component<WBGameProps> {
  public render() {
    const { gameState, pauseGame } = this.props;
    return (
      <div className={'wb-game'}>
        <div className={'wb-game__left'}>
          <div className={'wbg-left-top'}>
            <InGameMenu gameState={gameState} pauseGame={() => pauseGame()} />
          </div>
          <div className={'wbg-left-bot'}>
            <div className={'wbg-lb-top'}>
              <LetterPool gameState={gameState} />
            </div>
            <div className={'wbg-lb-bot'}>
              <ActiveWordZone gameState={gameState} />
            </div>
          </div>
        </div>
        <div className={'wb-game__right'}>
          <AnswerWordZone gameState={gameState} />
        </div>
      </div>
    );
  }
}
