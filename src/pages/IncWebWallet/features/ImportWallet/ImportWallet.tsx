import { useWindowSize } from 'hooks/useWindowSize';
import { FOOTER_ID, HEADER_ID } from 'pages/App';
import Header from 'pages/IncWebWallet/components/Header';
import Steps from 'pages/IncWebWallet/components/Steps';
import { IStep } from 'pages/IncWebWallet/components/Steps/Steps';
import { WalletState } from 'pages/IncWebWallet/core/types';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { webWalletStateSelector } from 'state/masterKey';

import SetPassword from '../CreateWallet/components/SetPassword';
import ImportPhrase from './components/ImportPhrase';
import { IImportWalletAction, ImportWalletAction } from './ImportWallet.actions';
import { Styled } from './ImportWallet.styled';

export enum ImportWalletType {
  import,
  restore,
}

enum ImportWalletSteps {
  import,
  setPassword,
}

const ImportWallet = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const webWalletState = useSelector(webWalletStateSelector);

  const [walletType, setWalletType] = React.useState<ImportWalletType>(ImportWalletType.import);

  const [currentStep, setCurrentStep] = React.useState(ImportWalletSteps.import);
  const [loading, setLoading] = React.useState(false);
  const [errMess, setErrMess] = React.useState<undefined | string>();

  const phraseRef = React.useRef('');
  const masterKeyNameRef = React.useRef('');
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

  React.useEffect(() => {
    if (webWalletState === WalletState.uninitialized) {
      setWalletType(ImportWalletType.import);
    } else {
      setWalletType(ImportWalletType.restore);
    }
  }, []);
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
    {
      title: walletType === ImportWalletType.import ? 'Import wallet' : 'Restore wallet',
      content: () => <ImportPhrase importWalletType={walletType} onImportPhrase={onImportPhrase} />,
    },
    {
      title: 'Set a password',
      content: () => <SetPassword loading={loading} errorMess={errMess} onConfirmPassword={onConfirmPassword} />,
    },
  ];

  return (
    <Styled className="default-max-width" height={contentSize}>
      <Header centerComponent={() => <Steps currentStep={currentStep} steps={steps} />} onClickGoBack={onGotoHome} />
      {steps[currentStep].content()}
    </Styled>
  );
};

export default memo(ImportWallet);
