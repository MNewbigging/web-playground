import { observer } from 'mobx-react';
import React from 'react';

import Tracked from '../../../../../../dist/assets/task-log/Tracked.svg';
import Untracked from '../../../../../../dist/assets/task-log/Untracked.svg';

import './tl-tracker-button.scss';

interface TBProps {
  tracked: boolean;
  onChange: (val: boolean) => void;
}

@observer
export class TLTrackerButton extends React.PureComponent<TBProps> {
  public render() {
    const { tracked } = this.props;
    const trackClass = tracked ? 'tracked' : 'untracked';
    return (
      <div className={'track-icon ' + trackClass} onClick={this.onTrackIconClick}>
        {this.getTrackingIcon(tracked)}
      </div>
    );
  }

  private readonly onTrackIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { tracked, onChange } = this.props;
    onChange(!tracked);
    event.stopPropagation();
  };

  private getTrackingIcon(tracked: boolean) {
    return tracked ? <Tracked /> : <Untracked />;
  }
}
