import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../fixed';

import './animations.scss';
import './letter-tile.scss';

interface LetterTileProps extends ILetterTile {
  className: string;
}

@observer
export class LetterTile extends React.Component<LetterTileProps> {
  public render() {
    const { delay, letter, status, className } = this.props;

    // Spin and pulse when inactive
    const anims = status === LetterTileStatus.INACTIVE ? 'spin' : '';

    // Don't show the letter when inactive
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;

    // Each tile has a delay to their fall-in animation (for cascade effect)
    const style = {
      animationDelay: `${delay}s`,
    };

    const classes: string[] = ['lt-inner', status, anims, className];
    return (
      <div className={'letter-tile fall-in'} style={style}>
        <div className={classes.join(' ')} style={style}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }
}
