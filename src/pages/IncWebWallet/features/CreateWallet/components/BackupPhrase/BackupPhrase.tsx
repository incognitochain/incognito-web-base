import { ButtonPrimary } from 'components/Core/Button';
import isEmpty from 'lodash/isEmpty';
import AlertMessage from 'pages/IncWebWallet/components/AlertMessage';
import { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import React from 'react';

import MasterKeyNameInput from './BackupPhrase.input';
import { Container } from './BackupPhrase.styled';

interface BackupPhraseProps {
  phrase: string;
  onContinue: (masterKeyName: string) => void;
}

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const BackupPhrase = (props: BackupPhraseProps) => {
  const [hidePhrase, setHidePhrase] = React.useState(true);

  const [masterKeyName, setMasterKeyName] = React.useState('');
  const [errorVisible, setErrorVisible] = React.useState(false);

  const masterKeyOnChange = React.useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyName(e.target.value);
  }, []);

  return (
    <Container>
      <p className="title">Back up your phrase</p>
      <p className="desc">
        When you create a new wallet, new phrase are generated. Your phrase are the master key of your wallet accounts
        and any value the hold.
      </p>
      <div className="masterkey">
        <p className="text">Master key name</p>
        <div className="wrap-input">
          <MasterKeyNameInput
            value={masterKeyName}
            placeholder={'Enter a name for your master key'}
            onChange={masterKeyOnChange}
            errorEnable={errorVisible}
            errorText={'Master key names must be alphanumeric. Please choose another.'}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === 'enter') {
                if (!NAME_PATTERN.test(masterKeyName)) {
                  setErrorVisible(true);
                  return;
                }
              }
            }}
          />
        </div>
      </div>
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

      <ButtonPrimary
        className="btn"
        disabled={errorVisible || isEmpty(masterKeyName)}
        onClick={() => props.onContinue(masterKeyName)}
      >
        <p className="text-btn">Continute</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(BackupPhrase);
