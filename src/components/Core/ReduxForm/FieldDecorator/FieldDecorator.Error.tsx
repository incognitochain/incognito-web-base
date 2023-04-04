import { Typography } from 'components/Core';
import React from 'react';

export type Props = {
  text?: string;
};

const FieldDecoratorError = (props: Props) => {
  const { text } = props;
  return (
    <Typography.Text type="p1" color="red_F6465D">
      {text}
    </Typography.Text>
  );
};

export default React.memo(FieldDecoratorError);
