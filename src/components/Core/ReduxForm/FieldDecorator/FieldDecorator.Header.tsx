import Typography from 'components/Core/Typography';
import React from 'react';

import { HeaderContainer, HeaderWrapper } from './FormField.styled';

type Props = {
  leftTitle?: string;
  rightTitle?: string;
  children?: React.ReactNode | React.ReactElement;
};

const FieldDecoratorHeader = ({ leftTitle, rightTitle, children, ...rest }: Props) => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Typography.Text type="p1" color="gray_9C9C9C">
          {leftTitle}
        </Typography.Text>
        <Typography.Text type="p1" color="gray_9C9C9C">
          {rightTitle}
        </Typography.Text>
      </HeaderWrapper>
      {children}
    </HeaderContainer>
  );
};

export default React.memo(FieldDecoratorHeader);
