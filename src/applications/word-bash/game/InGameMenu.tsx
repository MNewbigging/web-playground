import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';
import { WordBashState } from '../WordBashState';

import './in-game-menu.scss';

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
        <Button
          className={'button'}
          minimal={true}
          text={`+1 Vowel (${vowelCount})`}
          onClick={() => wbState.getExtraVowel()}
        />
        <Button
          className={'button'}
          minimal={true}
          text={`+1 Consonant (${consCount})`}
          onClick={() => wbState.getExtraConsonant()}
        />
      </div>
    );
  }
}
