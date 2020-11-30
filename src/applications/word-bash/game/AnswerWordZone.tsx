import React from 'react';

import { observer } from 'mobx-react';

import { WBGameState } from '../WBGameState';
import { AnswerWord } from './AnswerWord';

import './answer-word-zone.scss';

interface AWZProps {
  gameState: WBGameState;
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
        <React.Fragment key={'ans3to4'}>
          <div key={'hd1'} className={'ap-heading'}>
            +0
          </div>
          <div key={'ap1'} className={'answer-pool'}>
            {ans3to4}
          </div>
        </React.Fragment>
      );
    }
    const ans5to6 = this.getAnswers5To6();
    if (ans5to6.length) {
      answerPools.push(
        <React.Fragment key={'ans5to6'}>
          <div key={'hd2'} className={'ap-heading'}>
            +1
          </div>
          <div key={'ap2'} className={'answer-pool'}>
            {ans5to6}
          </div>
        </React.Fragment>
      );
    }
    const ans7to8 = this.getAnswers7To8();
    if (ans7to8.length) {
      answerPools.push(
        <React.Fragment key={'ans7to8'}>
          <div key={'h3'} className={'ap-heading'}>
            +2
          </div>
          <div key={'ap3'} className={'answer-pool'}>
            {ans7to8}
          </div>
        </React.Fragment>
      );
    }
    const ans9p = this.getAnswers9Plus();
    if (ans9p.length) {
      answerPools.push(
        <React.Fragment key={'ans9plus'}>
          <div key={'h4'} className={'ap-heading'}>
            +3
          </div>
          <div key={'ap4'} className={'answer-pool'}>
            {ans9p}
          </div>
        </React.Fragment>
      );
    }

    return answerPools;
  }

  private getAnswers3To4() {
    const { gameState } = this.props;
    const answers3To4: JSX.Element[] = [];
    gameState.answers3To4.forEach((ans) => {
      answers3To4.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={gameState} />);
    });
    return answers3To4;
  }

  private getAnswers5To6() {
    const { gameState } = this.props;
    const answers5To6: JSX.Element[] = [];
    gameState.answers5To6.forEach((ans) => {
      answers5To6.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={gameState} />);
    });
    return answers5To6;
  }

  private getAnswers7To8() {
    const { gameState } = this.props;
    const answers7To8: JSX.Element[] = [];
    gameState.answers7To8.forEach((ans) => {
      answers7To8.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={gameState} />);
    });
    return answers7To8;
  }

  private getAnswers9Plus() {
    const { gameState } = this.props;
    const answers9Plus: JSX.Element[] = [];
    gameState.answers9Plus.forEach((ans) => {
      answers9Plus.push(<AnswerWord key={'aw-' + ans} word={ans} wbState={gameState} />);
    });
    return answers9Plus;
  }
}
