import UnlockLogo from 'assets/svg/unlock_wallet_logo.svg';
import { useModal } from 'components/Modal';
import { isEmpty } from 'lodash';
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

  const [password, setPassword] = React.useState('');
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
        history.push('/');
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
      <div className="input-container">
        <p className="text">Password</p>
        <input
          className="input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={onChangePassword}
        />
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
