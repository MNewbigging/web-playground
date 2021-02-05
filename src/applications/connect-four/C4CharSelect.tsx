import React from 'react';

import './c4-char-select.scss';

import Bear from '../../../dist/assets/icons/Bear.svg';
import Bison from '../../../dist/assets/icons/Bison.svg';

export class C4CharSelect extends React.Component {
  public render() {
    return (
      <>
        <Bear className={'anim-icon'} />
        <Bison className={'anim-icon'} />
        <Bison width={200} height={200} />
      </>
    );
  }
}
