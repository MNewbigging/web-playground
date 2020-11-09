import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../WordBashState';

import './letter-tile.scss';

@observer
export class LetterTile extends React.Component<ILetterTile> {
  public render() {
    const { letter, status } = this.props;
    // need a div inside this so the circle is centererd
    return (
      <div className={'letter-tile ' + status}>
        {status !== LetterTileStatus.INACTIVE && <div>{letter}</div>}
      </div>
    );
  }
}
