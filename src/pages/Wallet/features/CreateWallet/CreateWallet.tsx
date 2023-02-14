import Header from 'pages/Wallet/components/Header';
import Steps, { IStep } from 'pages/Wallet/components/Steps/Steps';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import BackupPhrase from './components/BackupPhrase';
import SetPassword from './components/SetPassword';
import VerifyPhrase from './components/VerifyPhrase';
import WalletCreated from './components/WalletCreated';
import { Styled } from './CreateWallet.styled';

const { newMnemonic } = require('incognito-chain-web-js/build/web/wallet');

enum CreateWalletSteps {
  backup,
  verifyPhrase,
  setPassword,
  created,
}

const CreateWallet = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = React.useState(CreateWalletSteps.backup);

  const [phrase, setPhrase] = React.useState('');
  const masterKeyNameRef = React.useRef('');

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
    setCurrentStep(CreateWalletSteps.created);
  };

  const onGotoHome = () => {
    history.push('/');
  };

  const steps: IStep[] = [
    {
      title: 'Back up your phrase',
      content: () => <BackupPhrase phrase={phrase} onContinue={onContinuteBackupPhrase} />,
    },
    {
      title: 'Verify your phrase',
      content: () => <VerifyPhrase phrase={phrase} onVerifySuccess={onVerifyPhraseSuccess} />,
    },
    { title: 'Set a password', content: () => <SetPassword onConfirmPassword={onConfirmPasswordSuccess} /> },
    {
      title: 'Wallet created',
      content: () => <WalletCreated address="tz1QVNRU9u1uEa5Vq51dlubscDeZ8o7jvw4Z" onContinue={onGotoHome} />,
    },
  ];

  return (
    <Styled className="default-max-width">
      <Header centerComponent={() => <Steps currentStep={currentStep} steps={steps} />} onClickGoBack={onGotoHome} />
      {steps[currentStep].content()}
    </Styled>
  );
};

export default memo(CreateWallet);
