import React from 'react';

import { LetterTileStatus } from '../WordBashState';
import { LetterTile } from './LetterTile';

import './answer-word.scss';

interface AnswerWordProps {
  word: string;
}

export class AnswerWord extends React.Component<AnswerWordProps> {
  public render() {
    const { word } = this.props;
    const upperWord = word.toUpperCase();
    const tiledWord: JSX.Element[] = [];
    for (let i: number = 0; i < word.length; i++) {
      tiledWord.push(
        <LetterTile key={'lt-' + i} letter={upperWord[i]} status={LetterTileStatus.NORMAL} />
      );
    }

    return <div className={'answer-word'}>{tiledWord}</div>;
  }
}
