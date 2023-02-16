import Header from 'pages/Wallet/components/Header';
import Steps from 'pages/Wallet/components/Steps';
import { IStep } from 'pages/Wallet/components/Steps/Steps';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SetPassword from '../CreateWallet/components/SetPassword';
import ImportPhrase from './components/ImportPhrase';
import { IImportWalletAction, ImportWalletAction } from './ImportWallet.actions';
import { Styled } from './ImportWallet.styled';

enum ImportWalletSteps {
  import,
  setPassword,
}

const ImportWallet = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = React.useState(ImportWalletSteps.import);
  const [loading, setLoading] = React.useState(false);
  const [errMess, setErrMess] = React.useState<undefined | string>();

  const phraseRef = React.useRef('');
  const masterKeyNameRef = React.useRef('');

  const importWalletActions: IImportWalletAction = new ImportWalletAction({
    component: {
      history,
      setLoading,
      setErrMess,
    },
    dispatch,
  });

  const onImportPhrase = (masterKeyName: string, phrase: string) => {
    masterKeyNameRef.current = masterKeyName;
    phraseRef.current = phrase;
    setCurrentStep(ImportWalletSteps.setPassword);
  };

  const onConfirmPassword = (password: string) => {
    importWalletActions.importWallet({
      masterKeyName: masterKeyNameRef.current,
      password,
      mnemonic: phraseRef.current,
    });
  };

  const onGotoHome = () => {
    history.push('/');
  };

  const steps: IStep[] = [
    { title: 'Import wallet', content: () => <ImportPhrase onImportPhrase={onImportPhrase} /> },
    {
      title: 'Set a password',
      content: () => <SetPassword loading={loading} errorMess={errMess} onConfirmPassword={onConfirmPassword} />,
    },
  ];

  return (
    <Styled className="default-max-width">
      <Header centerComponent={() => <Steps currentStep={currentStep} steps={steps} />} onClickGoBack={onGotoHome} />
      {steps[currentStep].content()}
    </Styled>
  );
};

export default memo(ImportWallet);
