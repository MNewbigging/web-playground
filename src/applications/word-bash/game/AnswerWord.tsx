import React from 'react';

interface AnswerWordProps {
  word: string;
}

export class AnswerWord extends React.Component<AnswerWordProps> {
  public render() {
    const { word } = this.props;
    return <div className={'answer-word'}>{word}</div>;
  }
}
