import React from 'react';

import { observer } from 'mobx-react';

import { Rune } from './components/Rune';

import './memo-rune.scss';

interface MRProps {
  toApp: () => void;
}

@observer
export class MemoRune extends React.Component<MRProps> {
  public render() {
    return (
      <div className={'memo-rune'}>
        <div className={'rune-area'}>
          <Rune />
        </div>
      </div>
    );
  }
}
