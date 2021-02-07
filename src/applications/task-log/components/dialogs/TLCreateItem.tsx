import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../model/TLTodo';
import { TLPriorityInput } from '../core/input/TLPriorityInput';
import { TLTextArea } from '../core/input/TLTextArea';
import { TLTextInput } from '../core/input/TLTextInput';
import { TLTrackerInput } from '../core/input/TLTrackerInput';
import { TLCreateItemState } from './TLCreateItemState';

import './tl-create-item.scss';

interface CreateItemProps {
  ciState: TLCreateItemState;
}

@observer
export class TLCreateItem extends React.PureComponent<CreateItemProps> {
  public render() {
    const { ciState } = this.props;
    return (
      <div className={'tl-create-item'}>
        <div className={'input-block'}>
          <TLTextInput placeholder={'TITLE'} onChange={ciState.setTitle} value={ciState.title} />
        </div>
        <div className={'input-block'}>
          <TLTextArea
            placeholder={'DESCRIPTION'}
            onChange={ciState.setDescription}
            value={ciState.description}
            id={'desc-text-area'}
          />
        </div>
        <div className={'input-block'}>
          <div className={'priority-tracked'}>
            <div className={'priority'}>
              <TLPriorityInput
                onSelect={(prio: TLPriority) => ciState.setPriority(prio)}
                priority={ciState.priority}
              />
            </div>
            <div className={'tracked'}>
              <TLTrackerInput
                tracked={ciState.tracked}
                onChange={(track: boolean) => ciState.setTracked(track)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
