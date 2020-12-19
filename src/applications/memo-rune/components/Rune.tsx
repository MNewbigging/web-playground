import React from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { IRune } from '../RuneUtils';

import './rune.scss';

interface RuneProps {
  rune: IRune;
}

@observer
export class Rune extends React.Component<RuneProps> {
  @observable private hover: boolean = false;

  public render() {
    const { rune } = this.props;
    const bgPos = this.hover
      ? `${rune.hoverX}px ${rune.hoverY}px`
      : `${rune.posX}px ${rune.posY}px`;
    const style = {
      backgroundPosition: bgPos,
    };

    if (this.hover) {
      console.log('rune: ', rune);
    }

    return (
      <div className={'rune-holder'}>
        <div
          className={'rune'}
          style={style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        ></div>
      </div>
    );
  }

  private handleMouseEnter = () => {
    console.log('enter');
    this.hover = true;
  };

  private handleMouseLeave = () => {
    console.log('leave');
    this.hover = false;
  };
}
