import React from 'react';

import { WordBashState } from '../WordBashState';

import './wb-options.scss';

interface WBOProps {
  wbState: WordBashState;
}

export class WBOptions extends React.Component<WBOProps> {
  public render() {
    return (
      <div className={'wb-options'}>
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
