import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../WordBashState';

import './animations.scss';
import './letter-tile.scss';

@observer
export class LetterTile extends React.Component<ILetterTile> {
  public render() {
    const { delay, letter, status } = this.props;

    // Spin when inactive
    const anim = status === LetterTileStatus.INACTIVE ? 'spin' : '';

    // Don't show the letter when inactive
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;

    // Each tile has a delay to their fall-in animation (for cascade effect)
    const style = {
      animationDelay: `${delay}s`,
    };

    const classes: string[] = ['lt-inner', status, anim];
    return (
      <div className={'letter-tile fall-in'} style={style}>
        <div className={classes.join(' ')}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }
}
