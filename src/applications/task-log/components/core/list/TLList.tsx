import React from 'react';

import { ITodo } from '../../../model/TLTodo';

import './tl-list.scss';

interface ListProps {
  items: ITodo[];
}

export class TLList extends React.PureComponent<ListProps> {
  public render() {
    return <div className={'tl-list'}>I'm the list</div>;
  }
}
