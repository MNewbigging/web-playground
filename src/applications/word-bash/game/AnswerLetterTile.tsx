import React from 'react';

import { observer } from 'mobx-react';

import './answer-letter-tile.scss';

export interface AnswerTileProps {
  letter: string;
  select: () => void;
}

@observer
export class AnswerLetterTile extends React.Component<AnswerTileProps> {
  public render() {
    const { letter } = this.props;

    return (
      <div className={'answer-letter-tile'} onClick={this.onClick}>
        <div>{letter.toUpperCase()}</div>
      </div>
    );
  }

  private onClick = () => {
    this.props.select();
  };
}
