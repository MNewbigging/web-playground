import React from 'react';

import { observer } from 'mobx-react';

import { Icon } from '@blueprintjs/core';

import { WBGameState } from '../WBGameState';

import './in-game-menu.scss';

interface IGMProps {
  gameState: WBGameState;
  pauseGame: () => void;
}

@observer
export class InGameMenu extends React.Component<IGMProps> {
  public render() {
    const { gameState, pauseGame } = this.props;
    const vowelCount: number = gameState.lifelines.vowels;
    const consCount: number = gameState.lifelines.consonants;

    return (
      <div className={'in-game-menu'}>
        <div className={'button menu'} onClick={() => pauseGame()}>
          <Icon icon={'menu'} />
        </div>
        <div className={'button-holder'}>
          <div className={'button'} onClick={() => gameState.getExtraVowel()}>
            +1 Vowel ({vowelCount})
          </div>
          <div className={'button'} onClick={() => gameState.getExtraConsonant()}>
            +1 Consonant ({consCount})
          </div>
        </div>

        <div className={'score'}>{gameState.gameScore}</div>
      </div>
    );
  }
}
