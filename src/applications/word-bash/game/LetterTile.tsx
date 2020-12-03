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
  private landingSFX: HTMLAudioElement;

  constructor(props: LetterTileProps) {
    super(props);
    this.landingSFX = new Audio(this.pickRandomLandingSFX());
  }

  public render() {
    const { delay, letter, status, innerClass, outerClass } = this.props;

    // Don't show the letter when inactive
    const letterStr = status === LetterTileStatus.INACTIVE ? '' : letter;

    // Each tile has a delay to their animation (for cascade effect)
    const style = {
      animationDelay: `${delay}s`,
    };

    // Play tile landing sfx after anim and delay
    const animEndTime = (0.5 + delay) * 1000;
    setTimeout(this.onAnimationEnd, animEndTime);

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

  private pickRandomLandingSFX(): string {
    const rnd = Math.ceil(Math.random() * 4);
    return '/dist/assets/sfx/impactWood_heavy_00' + rnd + '.ogg';
  }

  private onAnimationEnd = () => {
    // const sfxClip = 'impactWood_heavy_000.ogg';
    // const dropFx = new Audio('/dist/assets/sfx/' + sfxClip);
    // dropFx.play();
    this.landingSFX.play();
  };
}
