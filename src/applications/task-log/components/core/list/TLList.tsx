import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../../../model/TLTodo';
import { TLListItem } from './TLListItem';

import './tl-list.scss';

interface ListProps {
  items: ITodo[];
  onItemSelect?: (id: string) => void;
  selectedId?: string;
}

@observer
export class TLList extends React.PureComponent<ListProps> {
  public render() {
    const { items, onItemSelect, selectedId } = this.props;
    const listItems: JSX.Element[] = items.map((item) => (
      <TLListItem
        key={item.id}
        todo={item}
        onSelect={() => onItemSelect(item.id)}
        selected={item.id === selectedId}
      />
    ));

    return <div className={'tl-list'}>{listItems}</div>;
  }
}
