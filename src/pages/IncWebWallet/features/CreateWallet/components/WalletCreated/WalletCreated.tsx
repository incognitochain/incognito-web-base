import { AppButton, Space, Typography } from 'components/Core';
// import IcWarning from 'pages/Wallet/images/ic_warning.svg';
import React from 'react';
import { shortenString } from 'utils';

import { Container } from './WalletCreated.styled';

interface WalletCreatedProps {
  address?: string;
  onContinue: () => void;
}

const WalletCreated = (props: WalletCreatedProps) => {
  return (
    <Container>
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        {'Wallet created!'}
      </Typography.Text>

      <Space.Vertical size={20} />

      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'}>
        {'Your wallet is now set up and ready to be used.'}
      </Typography.Text>

      <Space.Vertical size={40} />

      <div className="box">
        <Typography.Text type="h7" fontWeight={600} color={'gray_9C9C9C'}>
          {'Your public account address:'}
        </Typography.Text>
        <Typography.Text type="h7" fontWeight={600} color={'white'}>
          {props.address ? shortenString(props.address) : ''}
        </Typography.Text>
      </div>

      <Space.Vertical size={60} />

      <AppButton variant="contained" buttonType="primary" width={'100%'} onClick={props.onContinue}>
        {'Continue'}
      </AppButton>
    </Container>
  );
};

export default React.memo(WalletCreated);
