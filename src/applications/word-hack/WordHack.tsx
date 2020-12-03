import React from 'react';

import './word-hack.scss';

interface WHProps {
  toApp: () => void;
}

export class WordHack extends React.Component<WHProps> {
  public render() {
    return (
      <div className={'word-hack'}>
        <div className={'back-wall'}></div>
        <div className={'desk'}></div>
        <div className={'computer'}>
          <div className={'computer-screen'}>I AM SOME TEXT</div>
        </div>
        <div className={'computer-base'}></div>
        <div className={'monitor'}>
          <div className={'monitor-screen'}></div>
        </div>
        <div className={'monitor-stand'}></div>
        <div className={'monitor-stand-foot'}></div>
      </div>
    );
  }
}
