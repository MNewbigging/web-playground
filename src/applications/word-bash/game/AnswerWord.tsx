import React from 'react';

import { WBGameState } from '../WBGameState';

import './answer-word.scss';

type RME = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface AnswerWordProps {
  word: string;
  wbState: WBGameState;
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
