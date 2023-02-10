import { ButtonPrimary } from 'components/Core/Button';
import AlertMessage from 'pages/Wallet/components/AlertMessage';
import { AlertMessageType } from 'pages/Wallet/components/AlertMessage/AlertMessage';
import React from 'react';

import { Container } from './BackupPhrase.styled';

interface BackupPhraseProps {
  phrase: string;
  onContinue: () => void;
}

const BackupPhrase = (props: BackupPhraseProps) => {
  const [hidePhrase, setHidePhrase] = React.useState(true);
  return (
    <Container>
      <p className="title">Back up your phrase</p>
      <p className="desc">
        When you create a new wallet, new tezos recovery (seed) words are generated. Your seed words are the master key
        of your wallet accounts and any value the hold.
      </p>
      <div className="box" onClick={() => setHidePhrase(false)} onMouseLeave={() => setHidePhrase(true)}>
        <p className="text-phrase">{props.phrase}</p>
        {hidePhrase && (
          <div className="overlay">
            <div className="content">
              <p className="text-click">Click here to reveal your phrase</p>
            </div>
          </div>
        )}
      </div>

      <AlertMessage
        type={AlertMessageType.warning}
        message="Be sure sure to back it up (your phrase), write it down, and keep it incredibly safe."
      />

      <ButtonPrimary className="btn" onClick={props.onContinue}>
        <p className="text-btn">Continute</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(BackupPhrase);
