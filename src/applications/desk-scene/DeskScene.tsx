import React from 'react';

import { Computer } from './scene/Computer';
import { DeskSceneState } from './DeskSceneState';

import './desk-scene.scss';

interface WHProps {
  toApp: () => void;
}

export class DeskScene extends React.Component<WHProps> {
  private whState = new DeskSceneState();
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
