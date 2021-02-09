import { observer } from 'mobx-react';
import React from 'react';

import { TLTrackerButton } from './TLTrackerButton';

import './tl-tracker-input.scss';

interface TrackerProps {
  tracked: boolean;
  onChange: (val: boolean) => void;
}

@observer
export class TLTrackerInput extends React.PureComponent<TrackerProps> {
  public render() {
    const { tracked, onChange } = this.props;
    return (
      <div className={'tl-tracker-input'}>
        <div className={'label'}>TRACKED</div>
        <TLTrackerButton tracked={tracked} onChange={onChange} />
      </div>
    );
  }
}
