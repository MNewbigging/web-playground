import React from 'react';

import './tl-text-input.scss';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export class TLTextInput extends React.PureComponent<TextInputProps> {
  public render() {
    const { onChange, placeholder, value } = this.props;
    return (
      <input
        className={'tl-input'}
        type={'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        maxLength={75}
      />
    );
  }
}
