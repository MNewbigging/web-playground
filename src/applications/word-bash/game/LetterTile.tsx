import React from 'react';

import { observer } from 'mobx-react';

import { ILetterTile, LetterTileStatus } from '../fixed';

import './animations.scss';
import './letter-tile.scss';

interface LetterTileProps extends ILetterTile {
  outerClass?: string; // css class name applied to outer tile container
  innerClass?: string; // additional css class names for anims come from pool
  select?: () => void;
}

@observer
export class LetterTile extends React.Component<LetterTileProps> {
  public render() {
    const { delay, letter, status, innerClass, outerClass } = this.props;

    // Don't show the letter when inactive
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;

    // Each tile has a delay to their animation (for cascade effect)
    const style = {
      animationDelay: `${delay}s`,
    };

    const outerClasses: string[] = ['letter-tile', 'fall-in', outerClass];
    const innerClasses: string[] = ['lt-inner', status, innerClass];

    return (
      <div className={outerClasses.join(' ')} style={style}>
        <div className={innerClasses.join(' ')} style={style} onClick={this.onInnerClick}>
          <div>{letterStr}</div>
        </div>
      </div>
    );
  }

  private onInnerClick = () => {
    this.props.select?.();
  };
}
