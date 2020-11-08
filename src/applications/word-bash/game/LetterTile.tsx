import React from 'react';

import { ILetterTile } from '../WordBashState';

import './letter-tile.scss';

export class LetterTile extends React.Component<ILetterTile> {
  public render() {
    const { letter } = this.props;
    return (
      <div className={'letter-tile'}>
        <div>{letter}</div>
      </div>
    );
  }
}
