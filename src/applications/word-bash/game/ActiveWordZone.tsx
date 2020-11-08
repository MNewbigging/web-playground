import React from 'react';

import { WordBashState } from '../WordBashState';

interface AWZProps {
  wbState: WordBashState;
}

import './active-word-zone.scss';

export class ActiveWordZone extends React.Component<AWZProps> {
  public render() {
    return <div className={'active-word-zone'}>ACTIVE WORD ZONE</div>;
  }
}
