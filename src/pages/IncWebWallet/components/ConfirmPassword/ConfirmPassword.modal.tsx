import { Modal } from 'antd';
import { Input } from 'components/Inputs';
import { isEmpty } from 'lodash';
import { MOCKUP_PASSWORD } from 'pages/IncWebWallet/mockup/password';
import { checkPasswordValid } from 'pages/IncWebWallet/services/wallet/passwordService';
import React from 'react';
import styled from 'styled-components/macro';

import { ButtonPrimary } from '../../../../components/Core/Button';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
`;

const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    background: ${({ theme }) => theme.color_grey1};
    border-radius: 20px;
    width: 430px;
  }

  .input-area {
    margin-top: 20px;

    .text {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
    }
    .input-container {
      margin-top: 8px;
    }

    .error {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      margin-top: 4px;
      color: ${({ theme }) => theme.content4};
    }
  }

  .btn {
    height: 50px;
    width: 100%;
    margin-top: 16px;
    .text-btn {
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      text-align: center;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.primary7};
    }
  }
`;

type ConfirmPasswordModalType = {
  confirmSuccess?: () => void;
  isModalOpen?: boolean;
  onBack?: () => void;
};

const ConfirmPasswordModal = (props: ConfirmPasswordModalType) => {
  const { isModalOpen, onBack, confirmSuccess } = props;

  const [password, setPassword] = React.useState(MOCKUP_PASSWORD);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>('');

  const onChangePassword = (event: any) => {
    const input = event.target.value;
    setPassword(input);
    setPasswordErrorMessage('');
  };

  const onBackPress = async () => {
    onBack && onBack();
  };

  const onConfirm = async () => {
    try {
      const passWordValid = await checkPasswordValid(password);
      if (passWordValid) {
        confirmSuccess && confirmSuccess();
      }
    } catch (error) {
      if (typeof error === 'object') {
        setPasswordErrorMessage(error?.message);
      }
    }
  };
  return (
    <ModalWrapper
      open={isModalOpen}
      footer={null}
      style={{ top: 42, right: 0, left: 45 }}
      closable={false}
      closeIcon={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Container>
        <NavigationHeader leftTitle={'Confirm Your Password'} onBack={() => onBackPress()} />
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
                  !isEmpty(password) && onConfirm();
                }
              }}
            />
          </div>
          {passwordErrorMessage && <p className="error">{passwordErrorMessage}</p>}
        </div>
        <ButtonPrimary className="btn" disabled={isEmpty(password)} onClick={onConfirm}>
          <p className="text-btn">Continue</p>
        </ButtonPrimary>
      </Container>
    </ModalWrapper>
  );
};

export default ConfirmPasswordModal;
