import { AppButton, Space, Typography } from 'components/Core';
import copy from 'copy-to-clipboard';
import { throttle } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import AlertMessage from 'pages/IncWebWallet/components/AlertMessage';
import { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import MasterKeyNameInput from './BackupPhrase.input';
import { Container } from './styled';

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

  const masterKeyOnBlur = React.useCallback(
    (e: any) => {
      setErrorVisible(!NAME_PATTERN.test(masterKeyName));
    },
    [masterKeyName]
  );

  const onClick = useCallback(
    throttle(
      () => {
        if (hidePhrase) {
          setHidePhrase(false);
        } else {
          copy(props.phrase);
          toast.success('Copied');
        }
      },
      1500,
      {
        leading: true,
        trailing: false,
      }
    ),
    [hidePhrase]
  );

  return (
    <Container>
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        {'Back up your seed'}
      </Typography.Text>
      <Space.Vertical size={20} />
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'} textAlign="center" width={'80%'}>
        When you create a new wallet, new phrase are generated. Your phrase are the master key of your wallet accounts
        and any value the hold.
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

      <div className="box button-hover" onClick={onClick} onMouseLeave={() => setHidePhrase(true)}>
        <Typography.Text type="h7" fontWeight={600} color={'white'} textAlign="center">
          {props.phrase}
        </Typography.Text>
        {hidePhrase && (
          <div className="overlay">
            <Typography.Text type="p1" fontWeight={500} color={'white'}>
              {'Click here to reveal your phrase'}
            </Typography.Text>
          </div>
        )}
      </div>

      <AlertMessage
        type={AlertMessageType.warning}
        message="Be sure sure to back it up (your phrase), write it down, and keep it incredibly safe."
      />
      <Space.Vertical size={40} />
      <AppButton
        variant="contained"
        buttonType="primary"
        width={'100%'}
        disabled={errorVisible || isEmpty(masterKeyName)}
        onClick={() => props.onContinue(masterKeyName)}
      >
        {'Continue'}
      </AppButton>
    </Container>
  );
};

export default React.memo(BackupPhrase);
