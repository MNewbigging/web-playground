import React from 'react';

import { observer } from 'mobx-react';

import { WordBashState } from '../WordBashState';
import { AnswerLetterTile } from './AnswerLetterTile';

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
      const iletter = wbState.letterPool[lpl];
      letters.push(<AnswerLetterTile key={'at-' + idx} letter={iletter.letter} />);
    });

    let alertClassName = wbState.rightAnswer ? 'correct' : '';
    alertClassName = wbState.wrongAnswer ? 'warning' : alertClassName;

    return <div className={'active-word-zone ' + alertClassName}>{letters}</div>;
  }
}
