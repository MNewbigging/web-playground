import React from 'react';

import './rune.scss';

// Needs to accept sprite sheet position as a prop
// Should go into style.backgroundPosition attribute on rune class

export class Rune extends React.Component {
  public render() {
    const bgPosition = '0px 0px';
    const style = {
      backgroundPosition: bgPosition,
    };
    return (
      <div className={'rune-holder'}>
        <div className={'rune'} style={style}></div>
      </div>
    );
  }
}
