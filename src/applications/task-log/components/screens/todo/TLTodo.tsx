import React from 'react';

import { TLPanel } from '../../core/TLPanel';

import './tl-todo.scss';

export class TLTodo extends React.PureComponent {
  public render() {
    return (
      <div className={'tl-todo'}>
        <TLPanel className={'todo-filter'}>
          <div>FILTER</div>
        </TLPanel>
        <TLPanel className={'todo-list'}>
          <div>TODO_LIST</div>
        </TLPanel>
        <TLPanel className={'todo-detail'}>
          <div>TODO_DETAILS</div>
        </TLPanel>
      </div>
    );
  }
}
