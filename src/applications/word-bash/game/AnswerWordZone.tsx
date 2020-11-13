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
    return <div className={'answer-word-zone'}>{this.getAnswerWords()}</div>;
  }

  // Gets answer pools for each tier of answer that exists
  private getAnswerWords() {
    const answerPools: JSX.Element[] = [];
    // Check for each tier
    const ans3to4 = this.getAnswers3To4();
    if (ans3to4.length) {
      answerPools.push(
        <>
          <div key={'hd1'} className={'ap-heading'}>
            +1
          </div>
          <div key={'ap1'} className={'answer-pool'}>
            {ans3to4}
          </div>
        </>
      );
    }
    const ans5to6 = this.getAnswers5To6();
    if (ans5to6.length) {
      answerPools.push(
        <>
          <div key={'hd2'} className={'ap-heading'}>
            +2
          </div>
          <div key={'ap2'} className={'answer-pool'}>
            {ans5to6}
          </div>
        </>
      );
    }
    const ans7to8 = this.getAnswers7To8();
    if (ans7to8.length) {
      answerPools.push(
        <>
          <div key={'h3'} className={'ap-heading'}>
            +3
          </div>
          <div key={'ap3'} className={'answer-pool'}>
            {ans7to8}
          </div>
        </>
      );
    }
    const ans9p = this.getAnswers9Plus();
    if (ans9p.length) {
      answerPools.push(
        <>
          <div key={'h4'} className={'ap-heading'}>
            +4
          </div>
          <div key={'ap4'} className={'answer-pool'}>
            {ans9p}
          </div>
        </>
      );
    }

    return answerPools;
  }

  private getAnswers3To4() {
    const { wbState } = this.props;
    const answers3To4: JSX.Element[] = [];
    wbState.answers3To4.forEach((ans) => {
      answers3To4.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={wbState} />);
    });
    return answers3To4;
  }

  private getAnswers5To6() {
    const { wbState } = this.props;
    const answers5To6: JSX.Element[] = [];
    wbState.answers5To6.forEach((ans) => {
      answers5To6.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={wbState} />);
    });
    return answers5To6;
  }

  private getAnswers7To8() {
    const { wbState } = this.props;
    const answers7To8: JSX.Element[] = [];
    wbState.answers7To8.forEach((ans) => {
      answers7To8.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={wbState} />);
    });
    return answers7To8;
  }

  private getAnswers9Plus() {
    const { wbState } = this.props;
    const answers9Plus: JSX.Element[] = [];
    wbState.answers9Plus.forEach((ans) => {
      answers9Plus.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={wbState} />);
    });
    return answers9Plus;
  }
}
