import Header from 'pages/Wallet/components/Header';
import Steps from 'pages/Wallet/components/Steps';
import { IStep } from 'pages/Wallet/components/Steps/Steps';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import SetPassword from '../CreateWallet/components/SetPassword';
import ImportPhrase from './components/ImportPhrase';
import { Styled } from './ImportWallet.styled';

enum ImportWalletSteps {
  import,
  setPassword,
}

const ImportWallet = () => {
  const history = useHistory();

  const [currentStep, setCurrentStep] = React.useState(ImportWalletSteps.import);

  const onConfirmPassword = (password: string) => {
    console.log('Password: ', password);
  };

  const onGotoHome = () => {
    history.push('/');
  };

  const steps: IStep[] = [
    { title: 'Import wallet', content: () => <ImportPhrase /> },
    { title: 'Set a password', content: () => <SetPassword onConfirmPassword={onConfirmPassword} /> },
  ];

  return (
    <Styled className="default-max-width">
      <Header centerComponent={() => <Steps currentStep={currentStep} steps={steps} />} onClickGoBack={onGotoHome} />
      {steps[currentStep].content()}
    </Styled>
  );
};

export default memo(ImportWallet);
