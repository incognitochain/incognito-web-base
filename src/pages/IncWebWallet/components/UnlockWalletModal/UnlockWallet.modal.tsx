import UnlockLogo from 'assets/svg/unlock_wallet_logo.svg';
import { Input } from 'components/Inputs';
import { useModal } from 'components/Modal';
import { isEmpty } from 'lodash';
import { MOCKUP_PASSWORD } from 'pages/IncWebWallet/mockup/password';
import { checkPasswordValid } from 'pages/IncWebWallet/services/wallet/passwordService';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unlockMasterKey } from 'state/masterKey';

import { ButtonPrimary } from '../../../../components/Core/Button';
import { Spinner, Styled } from './UnlockWallet.styled';

const UnlockWalletModal = () => {
  const history = useHistory();
  const dispath = useDispatch();
  const { clearAllModal } = useModal();

  const [password, setPassword] = React.useState(MOCKUP_PASSWORD);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const onChangePassword = (event: any) => {
    const input = event.target.value;
    setPassword(input);
    setPasswordErrorMessage('');
  };

  const onClickForgotpassword = () => {
    history.push('/wallet/restore');
    clearAllModal();
  };

  const onClickGoIncognito = async () => {
    try {
      setLoading(true);
      const passWordValid = await checkPasswordValid(password);
      if (passWordValid) {
        dispath(unlockMasterKey(password));
        clearAllModal();
        toast.success('Wallet unlocked');
      }
    } catch (error) {
      if (typeof error === 'object') {
        setPasswordErrorMessage(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled>
      <div className="header">
        <img alt="logo" src={UnlockLogo} />
        <p className="title">Welcome back</p>
      </div>
      <div className="input-area">
        <p className="text">Password</p>
        <div className="input-container">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChangePassword}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === 'enter') {
                !isEmpty(password) && onClickGoIncognito();
              }
            }}
          />
        </div>
        {passwordErrorMessage && <p className="error">{passwordErrorMessage}</p>}
      </div>
      <ButtonPrimary className="btn" disabled={isEmpty(password)} onClick={onClickGoIncognito}>
        {loading ? <Spinner /> : <p className="text-btn">Go Incognito</p>}
      </ButtonPrimary>

      <p className="forgot-pass" onClick={onClickForgotpassword}>
        Forgot your password?
      </p>
    </Styled>
  );
};

export default React.memo(UnlockWalletModal);
