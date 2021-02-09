import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../../model/TLTodo';

import LowPriority from '../../../../../../dist/assets/task-log/LowPriority.svg';

import './tl-priority-input.scss';

type RME = React.MouseEvent<HTMLDivElement, MouseEvent>;

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
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.HI)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.HI)}
          onClick={(event: RME) => this.setPriority(event, TLPriority.HI)}
        >
          <LowPriority />
        </div>
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.MID)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.MID)}
          onClick={(event: RME) => this.setPriority(event, TLPriority.MID)}
        >
          <LowPriority />
        </div>
        <div
          className={'chevron ' + this.getPriorityClass(TLPriority.LOW)}
          onMouseEnter={() => this.setHoverPriority(TLPriority.LOW)}
          onClick={(event: RME) => this.setPriority(event, TLPriority.LOW)}
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

  private readonly setPriority = (event: RME, prio: TLPriority) => {
    this.props.onSelect(prio);
    event.stopPropagation();
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
