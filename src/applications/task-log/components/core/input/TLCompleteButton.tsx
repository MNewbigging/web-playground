import { observer } from 'mobx-react';
import React from 'react';

import Uncheked from '../../../../../../dist/assets/task-log/bp.svg';
import Checked from '../../../../../../dist/assets/task-log/bpChecked.svg';

import './tl-complete-button.scss';

interface CBProps {
  complete: boolean;
  onChange: (val: boolean) => void;
}

@observer
export class TLCompleteButton extends React.PureComponent<CBProps> {
  public render() {
    const { complete } = this.props;
    const completeClass = complete ? 'checked' : 'unchecked';
    return (
      <div className={'complete-icon ' + completeClass} onClick={this.onCheckIconClick}>
        {this.getCheckIcon(complete)}
      </div>
    );
  }

  private readonly onCheckIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { complete, onChange } = this.props;
    onChange(!complete);
    event.stopPropagation();
  };

  private getCheckIcon(checked: boolean) {
    return checked ? <Checked /> : <Uncheked />;
  }
}
