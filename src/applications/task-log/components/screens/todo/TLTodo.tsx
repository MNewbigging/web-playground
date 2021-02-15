import { observer } from 'mobx-react';
import React from 'react';

import { TLButton, TLButtonIntent } from '../../core/TLButton';
import { TLPanel } from '../../core/TLPanel';
import { TLItemDetails } from '../../TLItemDetails';
import { TLFilterPanel } from './TLFilterPanel';
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
    return (
      <div className={'tl-todo'}>
        <TLPanel
          className={'todo-filter'}
          title={'FILTER_ITEMS'}
          actionRail={this.renderFilterPanelActionRail()}
        >
          <TLFilterPanel fpState={todoState.fpState} />
        </TLPanel>
        <TLItemsPanel todoState={todoState} />
        <TLPanel className={'todo-detail'} title={'ITEM_DETAILS'}>
          <TLItemDetails todo={todoState.selectedTodo} />
        </TLPanel>
      </div>
    );
  }

  private renderFilterPanelActionRail() {
    const { todoState } = this.props;
    return (
      <div className={'filter-action-rail'}>
        <TLButton
          intent={TLButtonIntent.ACCEPT}
          text={'FILTER'}
          onClick={() => todoState.runFilter()}
        />
        <TLButton
          intent={TLButtonIntent.REJECT}
          text={'CLEAR'}
          onClick={() => todoState.clearFilter()}
        />
      </div>
    );
  }
}
