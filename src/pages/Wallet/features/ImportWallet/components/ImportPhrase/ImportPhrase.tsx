import { ButtonPrimary } from 'components/Core/Button';
import { isEmpty, trim } from 'lodash';
import AlertMessage from 'pages/Wallet/components/AlertMessage';
import { AlertMessageType } from 'pages/Wallet/components/AlertMessage/AlertMessage';
import React from 'react';
import { useHistory } from 'react-router-dom';

import MasterKeyNameInput from '../../../CreateWallet/components/BackupPhrase/BackupPhrase.input';
import { ImportWalletType } from '../../ImportWallet';
import { Container } from './ImportPhrase.styled';

const { validateMnemonic } = require('incognito-chain-web-js/build/web/wallet');

interface ImportPhraseProps {
  importWalletType: ImportWalletType;
  onImportPhrase: (masterKeyName: string, phrase: string) => void;
}

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const ImportPhrase = (props: ImportPhraseProps) => {
  const history = useHistory();

  const [phrase, setPhrase] = React.useState('');
  const [masterKeyName, setMasterKeyName] = React.useState('');
  const [errorVisible, setErrorVisible] = React.useState(false);

  const [isValidPhrase, setIsValidPhrase] = React.useState(false);

  const ableClick = phrase.split(' ').length === 12;

  const masterKeyOnChange = React.useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyName(e.target.value);
  }, []);

  const onChangePhrase = (event: any) => {
    const input = event.target.value;
    setPhrase(input);
    setIsValidPhrase(false);
  };

  const onClickContinue = () => {
    if (validateMnemonic(trim(phrase))) {
      props.onImportPhrase(props.importWalletType === ImportWalletType.import ? masterKeyName : 'Wallet', phrase);
    } else {
      setIsValidPhrase(true);
    }
  };

  const onClickCreateWallet = () => {
    history.push('/create-wallet');
  };

  return (
    <Container>
      <p className="title">{props.importWalletType === ImportWalletType.import ? 'Import wallet' : 'Restore wallet'}</p>
      <p className="desc">
        {props.importWalletType === ImportWalletType.import
          ? 'Recovery your phrase 12 words'
          : 'Restore your wallet using your twelve seed words. Note that this will delete all existing keychains on this device.'}
      </p>
      {props.importWalletType === ImportWalletType.import && (
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
      )}
      <div className="box">
        <textarea
          className="input-phrase"
          placeholder="Your phrase (required)"
          value={phrase}
          onChange={onChangePhrase}
        />
      </div>

      {isValidPhrase && <AlertMessage type={AlertMessageType.error} message="Your phrase is invalid." />}

      <ButtonPrimary
        className="btn"
        disabled={!ableClick || (props.importWalletType === ImportWalletType.import && isEmpty(masterKeyName))}
        onClick={onClickContinue}
      >
        <p className="text-btn">{props.importWalletType === ImportWalletType.import ? 'Import' : 'Restore'}</p>
      </ButtonPrimary>

      {props.importWalletType === ImportWalletType.restore && (
        <p className="create-new-wallet" onClick={onClickCreateWallet}>
          Create new wallet?
        </p>
      )}
    </Container>
  );
};

export default React.memo(ImportPhrase);
