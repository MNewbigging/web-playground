import React from 'react';

import Tracked from '../../../../../../dist/assets/task-log/Tracked.svg';
import Untracked from '../../../../../../dist/assets/task-log/Untracked.svg';

import './tl-tracker-input.scss';

interface TrackerProps {
  tracked: boolean;
  onChange: (val: boolean) => void;
}

export class TLTrackerInput extends React.PureComponent<TrackerProps> {
  public render() {
    const { tracked, onChange } = this.props;
    const trackClass = tracked ? 'tracked' : 'untracked';
    return (
      <div className={'tl-tracker-input'}>
        <div className={'label'}>TRACKED</div>
        <div className={'track-icon ' + trackClass} onClick={() => onChange(!tracked)}>
          {this.getTrackingIcon(tracked)}
        </div>
      </div>
    );
  }

  private getTrackingIcon(tracked: boolean) {
    return tracked ? <Tracked /> : <Untracked />;
  }
}
