import React from 'react';

import { ITodo } from '../../../model/TLTodo';
import { TLListItem } from './TLListItem';

import './tl-list.scss';

interface ListProps {
  items: ITodo[];
}

export class TLList extends React.PureComponent<ListProps> {
  public render() {
    return <div className={'tl-list'}>{this.getDummyListItems()}</div>;
  }

  private getDummyListItems() {
    const listItems: JSX.Element[] = [];
    for (let i = 0; i < 30; i++) {
      listItems.push(<TLListItem key={'li-' + i} />);
    }
    return listItems;
  }
}
