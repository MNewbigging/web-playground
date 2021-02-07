import React from 'react';

import { ITodo } from '../../../model/TLTodo';

import './tl-list-item.scss';

interface TLItemProps {
  todo: ITodo;
}

export class TLListItem extends React.PureComponent<TLItemProps> {
  public render() {
    const { title, description } = this.props.todo;
    return (
      <div className={'tl-list-item'}>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
      </div>
    );
  }
}
