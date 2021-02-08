import { observer } from 'mobx-react';
import React from 'react';

import { TLList } from '../../core/list/TLList';
import { TLPanel } from '../../core/TLPanel';
import { TLTodoState } from './TLTodoState';

import './tl-todo.scss';

interface TodoProps {
  todoState: TLTodoState;
}

@observer
export class TLTodo extends React.PureComponent<TodoProps> {
  public render() {
    const { todoState } = this.props;
    return (
      <div className={'tl-todo'}>
        <TLPanel className={'todo-filter'} title={'FILTER'}></TLPanel>
        <TLPanel className={'todo-list'} title={'TODO_ITEMS'}>
          <TLList items={todoState.todos} />
        </TLPanel>
        <TLPanel className={'todo-detail'} title={'ITEM_DETAILS'}></TLPanel>
      </div>
    );
  }
}
