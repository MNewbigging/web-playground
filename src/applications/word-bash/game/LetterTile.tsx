import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile } from '../WordBashState';

import './letter-tile.scss';

@observer
export class LetterTile extends React.Component<ILetterTile> {
  public render() {
    const { letter, status } = this.props;
    return (
      <div className={'letter-tile ' + status}>
        <div>{letter}</div>
      </div>
    );
  }
}
