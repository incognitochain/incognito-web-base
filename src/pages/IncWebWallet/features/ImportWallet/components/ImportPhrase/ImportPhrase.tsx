import { AppButton, Space, Typography } from 'components/Core';
import { isEmpty, trim } from 'lodash';
import AlertMessage from 'pages/IncWebWallet/components/AlertMessage';
import { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import React, { useMemo } from 'react';
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

  const [isInValidPhrase, setInValidPhrase] = React.useState(false);

  const ableClick = phrase.split(' ').length === 12;

  const disbaleContinue = useMemo(() => {
    if (errorVisible) return true;
    if (isInValidPhrase) return true;
    if (isEmpty(masterKeyName)) return true;
    return false;
  }, [ableClick, errorVisible, isInValidPhrase]);

  const masterKeyOnChange = React.useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyName(e.target.value);
  }, []);

  const onChangePhrase = (event: any) => {
    const input = event.target.value;
    setPhrase(input);
    setInValidPhrase(false);
  };

  const onClickContinue = () => {
    if (validateMnemonic(trim(phrase))) {
      props.onImportPhrase(props.importWalletType === ImportWalletType.import ? masterKeyName : 'Wallet', phrase);
    } else {
      setInValidPhrase(true);
    }
  };
  const onBlurTextArea = (event: any) => {
    setInValidPhrase(!validateMnemonic(phrase));
  };

  const masterKeyOnBlur = React.useCallback(
    (e: any) => {
      setErrorVisible(!NAME_PATTERN.test(masterKeyName));
    },
    [masterKeyName]
  );

  const onClickCreateWallet = () => {
    history.push('/wallet/create');
  };

  return (
    <Container>
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        {props.importWalletType === ImportWalletType.import ? 'Import wallet' : 'Restore wallet'}
      </Typography.Text>

      <Space.Vertical size={20} />

      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign="center" width={'80%'}>
        {props.importWalletType === ImportWalletType.import
          ? 'Recovery your phrase 12 words'
          : 'Restore your wallet using your twelve seed words. Note that this will delete all existing keychains on this device.'}
      </Typography.Text>

      <Space.Vertical size={20} />

      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign="left" width={'100%'}>
        {'Master key name'}
      </Typography.Text>

      <Space.Vertical size={10} />

      <MasterKeyNameInput
        value={masterKeyName}
        placeholder={'Enter a name for your master key'}
        onChange={masterKeyOnChange}
        onBlur={masterKeyOnBlur}
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

      <Space.Vertical size={20} />

      <div className="box">
        <textarea
          className="input-phrase"
          placeholder="Your phrase (required)"
          value={phrase}
          onChange={onChangePhrase}
          onBlur={onBlurTextArea}
        />
      </div>

      {isInValidPhrase && <AlertMessage type={AlertMessageType.error} message="Your phrase is invalid." />}

      <Space.Vertical size={40} />

      <AppButton
        variant="contained"
        buttonType="primary"
        width={'100%'}
        disabled={disbaleContinue}
        onClick={onClickContinue}
      >
        {props.importWalletType === ImportWalletType.import ? 'Import' : 'Restore'}
      </AppButton>

      <Space.Vertical size={10} />

      {props.importWalletType === ImportWalletType.restore && (
        <AppButton variant="text" onClick={onClickCreateWallet}>
          {'Create new wallet?'}
        </AppButton>
      )}
    </Container>
  );
};

export default React.memo(ImportPhrase);
