import { Modal } from 'antd';
import { AppButton, PasswordInput, Space, Typography } from 'components/Core';
import { isEmpty } from 'lodash';
import { MOCKUP_PASSWORD } from 'pages/IncWebWallet/mockup/password';
import { checkPasswordValid } from 'pages/IncWebWallet/services/wallet/passwordService';
import React from 'react';
import styled from 'styled-components/macro';

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
      centered
      closeIcon={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Container>
        <NavigationHeader leftTitle={'Confirm Your Password'} onBack={() => onBackPress()} />
        <div className="input-area">
          {/* <Typography.Text type="p2" fontWeight={500} color="gray_9C9C9C" textAlign="left">
            {'Password'}
          </Typography.Text> */}
          {/* <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChangePassword}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === 'enter') {
                !isEmpty(password) && onConfirm();
              }
            }}
          /> */}

          <PasswordInput
            title="Password"
            placeholder="Enter your password"
            value={password}
            onChange={onChangePassword}
          />
          <Space.Vertical size={10} />
          {passwordErrorMessage && (
            <Typography.Text type="p2" fontWeight={500} color="red_F6465D" textAlign="left">
              {passwordErrorMessage}
            </Typography.Text>
          )}
        </div>
        <Space.Vertical size={20} />
        <AppButton variant="contained" buttonType="primary" disabled={isEmpty(password)} onClick={onConfirm}>
          {'Continue'}
        </AppButton>
      </Container>
    </ModalWrapper>
  );
};

export default ConfirmPasswordModal;
