import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../WordBashState';

import './letter-tile.scss';

interface LetterTileProps extends ILetterTile {
  animDelay?: number;
}

@observer
export class LetterTile extends React.Component<LetterTileProps> {
  public render() {
    const { animDelay, letter, status } = this.props;
    // need a div inside this so the circle is centererd
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;
    console.log('anim delay: ', animDelay);
    const style = {
      animationDelay: `${animDelay}s`,
    };

    return (
      <div className={'letter-tile'} style={style}>
        <div className={'lt-inner ' + status}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }
}
