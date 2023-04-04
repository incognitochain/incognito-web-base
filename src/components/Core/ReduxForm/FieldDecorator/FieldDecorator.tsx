import React from 'react';

import FieldDecoratorBody from './FieldDecorator.Body';
import FieldDecoratorError from './FieldDecorator.Error';
import FieldDecoratorHeader from './FieldDecorator.Header';
import FieldDecoratorInput from './FieldDecorator.Input';
import { Container } from './FormField.styled';

type FieldDecoratorProps = {
  children?: React.ReactNode | React.ReactElement;
  disabled?: boolean;
};

function FieldDecorator(props: FieldDecoratorProps) {
  const { disabled = false, children } = props;
  return <Container disabled={disabled}>{children}</Container>;
}

FieldDecorator.Header = FieldDecoratorHeader;
FieldDecorator.Body = FieldDecoratorBody;
FieldDecorator.Input = FieldDecoratorInput;
FieldDecorator.Error = FieldDecoratorError;

export default FieldDecorator;
