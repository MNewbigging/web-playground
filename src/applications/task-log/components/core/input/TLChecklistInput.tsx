import { observer } from 'mobx-react';
import React from 'react';

import { TLChecklistInputState } from './TLChecklistInputState';

import './tl-checklist-input.scss';

interface CLProps {
  // on change? on finish row, on single character input??
}

@observer
export class TLChecklistInput extends React.PureComponent {
  private readonly clState = new TLChecklistInputState();
  public render() {
    const mode = this.clState.active ? 'active' : 'inactive';
    return (
      <div className={'tl-checklist-input ' + mode} onClick={() => this.clState.openInput()}>
        {<div>CREATE_CHECKLIST</div>}
      </div>
    );
  }
}
