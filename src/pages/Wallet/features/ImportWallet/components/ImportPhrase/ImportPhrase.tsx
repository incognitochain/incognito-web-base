import { ButtonPrimary } from 'components/Core/Button';
import { isEmpty } from 'lodash';
import React from 'react';

import MasterKeyNameInput from '../../../CreateWallet/components/BackupPhrase/BackupPhrase.input';
import { Container } from './ImportPhrase.styled';

interface ImportPhraseProps {
  onImportPhrase: (masterKeyName: string, phrase: string) => void;
}

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const ImportPhrase = (props: ImportPhraseProps) => {
  const [phrase, setPhrase] = React.useState('');
  const [masterKeyName, setMasterKeyName] = React.useState('');
  const [errorVisible, setErrorVisible] = React.useState(false);

  const isValidPhrase = phrase.split(' ').length === 12;

  const masterKeyOnChange = React.useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyName(e.target.value);
  }, []);

  const onChangePhrase = (event: any) => {
    const input = event.target.value;
    setPhrase(input);
  };

  return (
    <Container>
      <p className="title">Import wallet</p>
      <p className="desc">Recovery your phrase 12 words</p>
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
      <div className="box">
        <textarea
          className="input-phrase"
          placeholder="Your phrase (required)"
          value={phrase}
          onChange={onChangePhrase}
        />
      </div>

      <ButtonPrimary
        className="btn"
        disabled={!isValidPhrase || isEmpty(masterKeyName)}
        onClick={() => props.onImportPhrase(masterKeyName, phrase)}
      >
        <p className="text-btn">Import</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(ImportPhrase);
