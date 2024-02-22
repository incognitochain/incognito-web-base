import React from 'react';
import { InputHTMLAttributes } from 'react';
import { WrappedFieldInputProps } from 'redux-form';

import { StyledInput } from './FormField.styled';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  input?: WrappedFieldInputProps;
};

const FieldDecoratorInput = (props: Props) => {
  const { input, ...rest } = props;
  return <StyledInput type="text" autoComplete="off" {...rest} {...input} />;
};

export default React.memo(FieldDecoratorInput);
