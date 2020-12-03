import React from 'react';

import { Computer } from './scene/Computer';
import { WordHackState } from './WordHackState';

import './word-hack.scss';

interface WHProps {
  toApp: () => void;
}

export class WordHack extends React.Component<WHProps> {
  private whState = new WordHackState();
  public render() {
    return (
      <div className={'word-hack'}>
        <div className={'back-wall'}></div>
        <div className={'desk'}></div>
        <Computer whState={this.whState} />
        <div className={'monitor'}>
          <div className={'monitor-screen'}></div>
        </div>
        <div className={'monitor-stand'}></div>
        <div className={'monitor-stand-foot'}></div>
      </div>
    );
  }
}
