import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../../../model/TLTodo';
import { TLListItem } from './TLListItem';

import './tl-list.scss';

interface ListProps {
  items: ITodo[];
}

@observer
export class TLList extends React.PureComponent<ListProps> {
  public render() {
    const { items } = this.props;
    const listItems: JSX.Element[] = items.map((item) => <TLListItem key={item.id} todo={item} />);
    console.log('render list');

    return <div className={'tl-list'}>{listItems}</div>;
  }
}
