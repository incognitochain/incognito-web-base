import { Space, Typography } from 'components/Core';
import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { BodyContainer, InputContainer } from './FormField.styled';

type BodyProps = WrappedFieldProps & {
  leftView?: React.ReactNode | React.ReactElement;
  rightView?: React.ReactNode | React.ReactElement;
  errorView?: React.ReactNode | React.ReactElement;
  children?: React.ReactNode | React.ReactElement;
};

const FieldDecoratorBody = (props: BodyProps) => {
  const { leftView, rightView, errorView, children, input, meta, ...rest } = props;
  const { visited, error, touched } = meta;

  const renderErrorView = () => {
    if (!visited || !touched || !error) return null;

    //Priority Custom View First
    if (errorView) return errorView;

    //Default Error View (Text)
    return (
      <>
        <Space.Vertical size={10} />
        <Typography.Text type="p2" color="red_F6465D" textAlign={'left'}>
          {error}
        </Typography.Text>
      </>
    );
  };

  return (
    <BodyContainer>
      <InputContainer>
        {leftView}
        {rightView}
      </InputContainer>
      {renderErrorView()}
      {children}
    </BodyContainer>
  );
};

export default React.memo(FieldDecoratorBody);
