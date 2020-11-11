import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../WordBashState';

import './letter-tile.scss';

@observer
export class LetterTile extends React.Component<ILetterTile> {
  public render() {
    const { letter, status } = this.props;
    // need a div inside this so the circle is centererd
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;
    return (
      <div className={'letter-tile'}>
        <div className={'lt-inner ' + status}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }
}
