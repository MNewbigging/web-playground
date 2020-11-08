import React from 'react';

import { observer } from 'mobx-react';

import { LetterTileStatus, WordBashState } from '../WordBashState';
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
    wbState.letterPool.forEach((letter) => {
      if (letter.status === LetterTileStatus.ACTIVE) {
        letters.push(<LetterTile {...letter} />);
      }
    });

    return <div className={'active-word-zone'}>{letters}</div>;
  }
}
