import { observer } from 'mobx-react';
import React from 'react';

import { TLPanel } from '../../core/TLPanel';
import { TLItemDetails } from '../../TLItemDetails';
import { TLItemsPanel } from './TLItemsPanel';
import { TLTodoState } from './TLTodoState';

import './tl-todo.scss';

interface TodoProps {
  todoState: TLTodoState;
}

@observer
export class TLTodo extends React.PureComponent<TodoProps> {
  public render() {
    const { todoState } = this.props;
    console.log('tltodo render');
    return (
      <div className={'tl-todo'}>
        <TLPanel className={'todo-filter'} title={'FILTER'}></TLPanel>
        <TLItemsPanel todoState={todoState} />
        <TLPanel className={'todo-detail'} title={'ITEM_DETAILS'}>
          {/* <TLItemDetails /> */}
        </TLPanel>
      </div>
    );
  }
}
