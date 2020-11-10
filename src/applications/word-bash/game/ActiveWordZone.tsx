import React from 'react';

import { observer } from 'mobx-react';

import { WordBashState } from '../WordBashState';
import { LetterTile } from './LetterTile';

import './active-word-zone.scss';

interface AWZProps {
  wbState: WordBashState;
}

@observer
export class ActiveWordZone extends React.Component<AWZProps> {
  public render() {
    const { wbState } = this.props;
    const letters: JSX.Element[] = [];
    wbState.lastPickedLetters.forEach((lpl, idx) => {
      const letter = wbState.letterPool[lpl];
      letters.push(<LetterTile key={'at-' + idx} {...letter} />);
    });

    let alertClassName = wbState.rightAnswer ? 'correct' : '';
    alertClassName = wbState.wrongAnswer ? 'warning' : alertClassName;

    return <div className={'active-word-zone ' + alertClassName}>{letters}</div>;
  }
}
