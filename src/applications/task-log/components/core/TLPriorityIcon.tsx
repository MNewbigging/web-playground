import React from 'react';

import { TLPriority } from '../../model/TLTodo';

import HiPriority from '../../../../../dist/assets/task-log/HiPriority.svg';
import LowPriority from '../../../../../dist/assets/task-log/LowPriority.svg';
import MidPriority from '../../../../../dist/assets/task-log/MidPriority.svg';

interface PrioIconProps {
  priority: TLPriority;
}

export class TLPriorityIcon extends React.PureComponent<PrioIconProps> {
  public render() {
    switch (this.props.priority) {
      case TLPriority.HI:
        return <HiPriority />;
      case TLPriority.MID:
        return <MidPriority />;
      case TLPriority.LOW:
        return <LowPriority />;
    }
  }
}
