import React from 'react';

import { WordBashState } from '../WordBashState';

import './answer-word.scss';

type RME = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface AnswerWordProps {
  word: string;
  wbState: WordBashState;
}

export class AnswerWord extends React.Component<AnswerWordProps> {
  public render() {
    const { word, wbState } = this.props;
    const upperWord = word.toUpperCase();

    return (
      <div className={'answer-word'}>
        <div key={word} onClick={() => wbState.removeAnswer(word)}>
          {upperWord}
        </div>
      </div>
    );
  }
}
