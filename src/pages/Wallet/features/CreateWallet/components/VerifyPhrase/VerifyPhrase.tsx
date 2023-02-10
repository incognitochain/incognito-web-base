import { ButtonPrimary } from 'components/Core/Button';
import AlertMessage, { AlertMessageType } from 'pages/Wallet/components/AlertMessage/AlertMessage';
import React from 'react';

import { Container } from './VerifyPhrase.styled';

interface VerifyPhraseProps {
  phrase: string;
  onVerifyPhrase: () => void;
}

const VerifyPhrase = (props: VerifyPhraseProps) => {
  const [confirmPhrase, setConfirmPhrase] = React.useState('');

  return (
    <Container>
      <p className="title">Verify your phrase</p>
      <p className="desc">Fill in the words to verify your phrase backup</p>
      <div className="box">
        <p className="text-phrase"></p>
      </div>

      <AlertMessage type={AlertMessageType.error} message="Wrong phrase!" />

      <ButtonPrimary className="btn" disabled onClick={props.onVerifyPhrase}>
        <p className="text-btn">Verify</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(VerifyPhrase);
