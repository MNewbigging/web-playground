import React from 'react';

import {observer} from 'mobx-react';

import { TestState } from './TestState';

@observer
export class Test extends React.Component {
  private tState = new TestState();
  public render() {
    return (
      <>
        <button onClick={() => this.tState.incTest()}>Increase</button>
        <div>Test number: {this.tState.test}</div>
      </>
    );
  }
}