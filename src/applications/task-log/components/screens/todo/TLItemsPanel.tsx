import { observer } from 'mobx-react';
import React from 'react';

import { TLList } from '../../core/list/TLList';
import { TLPanel } from '../../core/TLPanel';
import { TLTodoState } from './TLTodoState';

interface ListPanelProps {
  todoState: TLTodoState;
}

@observer
export class TLItemsPanel extends React.PureComponent<ListPanelProps> {
  public render() {
    const { todoState } = this.props;

    return (
      <TLPanel className={'todo-list'} title={'TODO_ITEMS'}>
        <TLList
          items={todoState.todos}
          onItemSelect={(id: string) => todoState.selectTodo(id)}
          selectedId={todoState.selectedTodo?.id}
        />
      </TLPanel>
    );
  }
}
