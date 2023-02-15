import { ButtonPrimary } from 'components/Core/Button';
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
      <p className="title">Wallet created!</p>
      <p className="desc">Your wallet is now set up and ready to be used.</p>
      <div className="box">
        <p className="text">Your public account address:</p>
        <p className="text text-address">{props.address ? shortenString(props.address) : ''}</p>
      </div>

      <ButtonPrimary className="btn" onClick={props.onContinue}>
        <p className="text-btn">Continue</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(WalletCreated);
