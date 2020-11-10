import React from 'react';

import { observer } from 'mobx-react';

import { WordBashState } from '../WordBashState';
import { AnswerWord } from './AnswerWord';

import './answer-word-zone.scss';

interface AWZProps {
  wbState: WordBashState;
}

@observer
export class AnswerWordZone extends React.Component<AWZProps> {
  public render() {
    const answers: JSX.Element[][] = this.getAnswerWords();

    return (
      <div className={'answer-word-zone'}>
        <div className={'answer-pool'}>3-4 {answers[0]}</div>
        <div className={'answer-pool'}>5-6 {answers[1]}</div>
        <div className={'answer-pool'}>7-8 {answers[2]}</div>
        <div className={'answer-pool'}>9+ {answers[3]}</div>
      </div>
    );
  }

  // This rebuilds/redraws all answers each time one is
  private getAnswerWords() {
    const { wbState } = this.props;
    const answers3To4: JSX.Element[] = [];
    const answers5To6: JSX.Element[] = [];
    const answers7To8: JSX.Element[] = [];
    const answers9Plus: JSX.Element[] = [];

    wbState.answers3To4.forEach((ans) => {
      answers3To4.push(<AnswerWord word={ans} wbState={wbState} />);
    });

    wbState.answers5To6.forEach((ans) => {
      answers5To6.push(<AnswerWord word={ans} wbState={wbState} />);
    });

    wbState.answers7To8.forEach((ans) => {
      answers7To8.push(<AnswerWord word={ans} wbState={wbState} />);
    });

    wbState.answers9Plus.forEach((ans) => {
      answers9Plus.push(<AnswerWord word={ans} wbState={wbState} />);
    });

    return [answers3To4, answers5To6, answers7To8, answers9Plus];
  }
}
