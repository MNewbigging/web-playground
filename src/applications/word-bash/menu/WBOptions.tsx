import React from 'react';

import { Button } from '@blueprintjs/core';

import { WBScreen } from '../fixed';
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
          <div className={'computer-screen'}></div>
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

  private renderBackToMenu() {
    const { wbState } = this.props;
    return (
      <Button
        className={'button'}
        text={'BACK'}
        onClick={() => wbState.toWbScreen(WBScreen.MENU)}
      />
    );
  }
}
