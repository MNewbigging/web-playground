import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../../model/TLTodo';

import LowPriority from '../../../../../../dist/assets/task-log/LowPriority.svg';

import './tl-priority-input.scss';

interface PrioProps {
  onSelect: (prio: TLPriority) => void;
  priority: TLPriority;
}

@observer
export class TLPriorityInput extends React.PureComponent<PrioProps> {
  @observable private hoverMode = false;
  @observable private hoverPriority?: TLPriority = undefined;

  public render() {
    const mode = this.hoverMode ? ' hover-mode' : '';
    return (
      <div
        className={'tl-priority-input' + mode}
        onMouseEnter={this.onEnterInput}
        onMouseLeave={this.onLeaveInput}
      >
        <div className={'label'}>PRIORITY</div>
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.HI)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.HI)}
          onClick={() => this.setPriority(TLPriority.HI)}
        >
          <LowPriority />
        </div>
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.MID)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.MID)}
          onClick={() => this.setPriority(TLPriority.MID)}
        >
          <LowPriority />
        </div>
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.LOW)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.LOW)}
          onClick={() => this.setPriority(TLPriority.LOW)}
        >
          <LowPriority />
        </div>
      </div>
    );
  }

  private readonly onEnterInput = () => {
    this.hoverMode = true;
    this.hoverPriority = undefined;
  };

  private readonly onLeaveInput = () => {
    this.hoverMode = false;
  };

  private readonly setHoverPriority = (prio: TLPriority) => {
    this.hoverPriority = prio;
  };

  private readonly setPriority = (prio: TLPriority) => {
    this.props.onSelect(prio);
  };

  private getPriorityClass(prio: TLPriority) {
    if (this.hoverMode) {
      if (this.hoverPriority === undefined) {
        return ' unselected';
      }
      return prio <= this.hoverPriority ? ' selected' : ' unselected';
    }

    return prio <= this.props.priority ? ' selected' : ' unselected';
  }
}
