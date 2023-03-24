import Typography from 'components/Core/Typography';
import IcError from 'pages/IncWebWallet/images/ic_error.svg';
import IcSuccess from 'pages/IncWebWallet/images/ic_success.svg';
import IcWarning from 'pages/IncWebWallet/images/ic_warning.svg';
import React from 'react';

import { Container } from './AlertMessage.styled';

export enum AlertMessageType {
  error,
  warning,
  success,
}

interface AlertMessageProps {
  type: AlertMessageType;
  message?: string;
}

const AlertMessage = (props: AlertMessageProps) => {
  if (!props.message) {
    return <div />;
  }
  let ic = IcWarning;
  switch (props.type) {
    case AlertMessageType.error:
      ic = IcError;
      break;
    case AlertMessageType.success:
      ic = IcSuccess;
      break;
  }
  return (
    <Container type={props.type}>
      <img alt="ic-warning" src={ic} />
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} className="text-warning">
        {props.message}
      </Typography.Text>
    </Container>
  );
};

export default React.memo(AlertMessage);
