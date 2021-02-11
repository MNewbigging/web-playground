import { observer } from 'mobx-react';
import React from 'react';

import { TLCompleteButton } from './TLCompleteButton';
import { TLTextInput } from './TLTextInput';

import './tl-checklist-input-item.scss';

interface CLIProps {
  itemText: string;
  onChange: (val: string) => void;
  onRemove: () => void;
}

@observer
export class TLChecklistItem extends React.PureComponent<CLIProps> {
  public render() {
    const { itemText, onChange, onRemove } = this.props;
    return (
      <div className={'checklist-item'}>
        <div className={'bullet'}>
          <TLCompleteButton complete={false} onChange={(_val: boolean) => onRemove()} />
        </div>
        <div className={'item-text'}>
          <TLTextInput
            placeholder={'Do the thing'}
            onChange={(val: string) => onChange(val)}
            value={itemText}
          />
        </div>
      </div>
    );
  }
}
