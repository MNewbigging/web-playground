import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../fixed';

import './animations.scss';
import './letter-tile.scss';

interface LetterTileProps extends ILetterTile {
  outerClass?: string; // css class name applied to outer tile container
  anims?: string; // additional css class names for anims come from pool
}

@observer
export class LetterTile extends React.Component<LetterTileProps> {
  public render() {
    const { delay, letter, status, anims, outerClass } = this.props;

    // Spin when inactive
    const spin = status === LetterTileStatus.INACTIVE ? 'spin' : '';

    // Don't show the letter when inactive
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;

    // Each tile has a delay to their animation (for cascade effect)
    const style = {
      animationDelay: `${delay}s`,
    };

    const classes: string[] = ['lt-inner', status, spin, anims];
    return (
      <div className={'letter-tile fall-in ' + outerClass} style={style}>
        <div className={classes.join(' ')} style={style}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }
}
