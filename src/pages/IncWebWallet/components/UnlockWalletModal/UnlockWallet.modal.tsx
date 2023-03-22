import UnlockLogo from 'assets/svg/unlock_wallet_logo.svg';
import { AppButton, Space, Typography } from 'components/Core';
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

import { Styled } from './UnlockWallet.styled';

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
        <Space.Vertical size={50} />
        <img alt="logo" src={UnlockLogo} />
        <Space.Vertical size={16} />
        <Typography.Text type="h5" fontWeight={700}>
          Welcome back
        </Typography.Text>
      </div>
      <div className="input-area">
        <Space.Vertical size={40} />
        <Typography.Text type="p2" fontWeight={400} color="gray_9C9C9C" textAlign={'left'}>
          Password
        </Typography.Text>
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
      <Space.Vertical size={20} />
      <AppButton variant="contained" buttonType="primary" disabled={isEmpty(password)} onClick={onClickGoIncognito}>
        {'Go Incognito'}
      </AppButton>
      <AppButton variant="text" onClick={onClickForgotpassword}>
        {'Forgot your password?'}
      </AppButton>
    </Styled>
  );
};

export default React.memo(UnlockWalletModal);
