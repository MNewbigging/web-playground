import { observer } from 'mobx-react';
import React from 'react';

import '../../blether-classes.scss';
import './bl-join-form.scss';

interface JoinFormProps {
  toHome: () => void;
  name: string;
  onNameChange: (name: string) => void;
  joinId: string;
  onJoinIdChange: (id: string) => void;
}

@observer
export class BLJoinForm extends React.PureComponent<JoinFormProps> {
  public render() {
    const { toHome, name, onNameChange, joinId, onJoinIdChange } = this.props;
    return (
      <div className={'join-form'}>
        <div className={'form'}>
          <div className={'label'}>What's your name?</div>
          <input
            className={'input'}
            type={'text'}
            value={name}
            maxLength={30}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onNameChange(event.target.value)
            }
          />

          <div className={'label'}>blether id</div>
          <input
            className={'input'}
            type={'text'}
            value={joinId}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onJoinIdChange(event.target.value)
            }
          />

          <div className={'button medium'}>Join a blether</div>
        </div>
        <div className={'back'}>
          <div className={'button small minimal'} onClick={toHome}>
            back
          </div>
        </div>
      </div>
    );
  }
}
