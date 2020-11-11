import React from 'react';

import { Tag } from '@blueprintjs/core';

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
        <Tag key={word} large={true} onRemove={() => wbState.removeAnswer(word)}>
          {upperWord}
        </Tag>
      </div>
    );
  }
}
