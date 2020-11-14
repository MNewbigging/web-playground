import React from 'react';

import { observer } from 'mobx-react';

import { Icon } from '@blueprintjs/core';

import { WordBashState } from '../WordBashState';

import './in-game-menu.scss';

type RME = React.MouseEvent<HTMLElement, MouseEvent>;

interface IGMProps {
  wbState: WordBashState;
}

@observer
export class InGameMenu extends React.Component<IGMProps> {
  public render() {
    const { wbState } = this.props;
    const vowelCount: number = wbState.lifeline.vowels;
    const consCount: number = wbState.lifeline.consonants;

    return (
      <div className={'in-game-menu'}>
        <div className={'button menu'} onClick={() => wbState.pauseGame()}>
          <Icon icon={'menu'} />
        </div>
        <div className={'button'} onClick={() => wbState.getExtraVowel()}>
          +1 Vowel ({vowelCount})
        </div>
        <div className={'button'} onClick={() => wbState.getExtraConsonant()}>
          +1 Consonant ({consCount})
        </div>
      </div>
    );
  }
}
