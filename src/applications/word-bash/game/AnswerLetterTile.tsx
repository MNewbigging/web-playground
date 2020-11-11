import React from 'react';

import { observer } from 'mobx-react';

import './answer-letter-tile.scss';

export interface AnswerTileProps {
  letter: string;
}

@observer
export class AnswerLetterTile extends React.Component<AnswerTileProps> {
  public render() {
    const { letter } = this.props;

    return (
      <div className={'answer-letter-tile'}>
        <div>{letter.toUpperCase()}</div>
      </div>
    );
  }
}
