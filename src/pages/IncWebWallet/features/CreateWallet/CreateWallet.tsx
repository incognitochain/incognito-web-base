import { useWindowSize } from 'hooks/useWindowSize';
import { FOOTER_ID, HEADER_ID } from 'pages/App';
import Header from 'pages/IncWebWallet/components/Header';
import Steps, { IStep } from 'pages/IncWebWallet/components/Steps/Steps';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { defaultAccountPaymentAddressSelector } from 'state/account/account.selectors';

import BackupPhrase from './components/BackupPhrase';
import SetPassword from './components/SetPassword';
import VerifyPhrase from './components/VerifyPhrase';
import WalletCreated from './components/WalletCreated';
import { CreateWalletAction, ICreateWalletAction } from './CreateWallet.actions';
import { Styled } from './CreateWallet.styled';

const { newMnemonic } = require('incognito-chain-web-js/build/web/wallet');

export enum CreateWalletSteps {
  backup,
  verifyPhrase,
  setPassword,
  created,
}

const CreateWallet = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const address = useSelector(defaultAccountPaymentAddressSelector);

  const { width, height } = useWindowSize();

  const [contentSize, setContentSize] = React.useState(height || 0);

  const getContentSize = () => {
    let contentSize = 0;
    const header = document.getElementById(HEADER_ID);
    const footer = document.getElementById(FOOTER_ID);
    if (height && header && footer) {
      const headerHeight = header.clientHeight;
      // const footerHeight = footer.clientHeight;
      const footerHeight = 0;
      contentSize = height - headerHeight - footerHeight - 100;
    }
    setContentSize(contentSize);
  };

  React.useEffect(() => {
    getContentSize();
  }, [width, height]);

  const [currentStep, setCurrentStep] = React.useState(CreateWalletSteps.backup);
  const [loading, setLoading] = React.useState(false);

  const [phrase, setPhrase] = React.useState('');
  const masterKeyNameRef = React.useRef('');

  const createWalletActions: ICreateWalletAction = new CreateWalletAction({
    component: {
      setLoading,
      setCurrentStep,
    },
    dispatch,
  });

  React.useLayoutEffect(() => {
    const mnemonic: string = newMnemonic() || '';
    setPhrase(mnemonic);
  }, []);

  const onContinuteBackupPhrase = (keyName: string) => {
    masterKeyNameRef.current = keyName;
    setCurrentStep(CreateWalletSteps.verifyPhrase);
  };

  const onVerifyPhraseSuccess = () => {
    setCurrentStep(CreateWalletSteps.setPassword);
  };

  const onConfirmPasswordSuccess = (password: string) => {
    createWalletActions.createWallet({
      masterKeyName: masterKeyNameRef.current,
      password,
      mnemonic: phrase,
    });
  };

  const onGotoHome = () => {
    history.push('/');
  };

  const steps: IStep[] = [
    {
      title: 'Back up your seed',
      content: () => <BackupPhrase phrase={phrase} onContinue={onContinuteBackupPhrase} />,
    },
    {
      title: 'Verify your phrase',
      content: () => <VerifyPhrase phrase={phrase} onVerifySuccess={onVerifyPhraseSuccess} />,
    },
    {
      title: 'Set a password',
      content: () => <SetPassword loading={loading} onConfirmPassword={onConfirmPasswordSuccess} />,
    },
    {
      title: 'Wallet created',
      content: () => <WalletCreated address={address} onContinue={onGotoHome} />,
    },
  ];

  return (
    <Styled className="default-max-width" height={contentSize}>
      <Header centerComponent={() => <Steps currentStep={currentStep} steps={steps} />} onClickGoBack={onGotoHome} />
      {steps[currentStep].content()}
    </Styled>
  );
};

export default memo(CreateWallet);
