import React from 'react';

import { Button } from '@blueprintjs/core';

import { WBScreen } from '../fixed';
import { WordBashState } from '../WordBashState';

interface WBOProps {
  wbState: WordBashState;
}

export class WBOptions extends React.Component<WBOProps> {
  public render() {
    const { wbState } = this.props;
    return (
      <>
        <div>I am the options screen</div>
        <Button
          className={'button'}
          text={'BACK'}
          onClick={() => wbState.toWbScreen(WBScreen.MENU)}
        />
      </>
    );
  }
}
