import { Input, message, Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { isEmpty, lowerCase, trim } from 'lodash';
import { CustomError, ErrorCode } from 'pages/IncWebWallet/services/exception';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchCreateAccount } from 'state/account';
import { listAccountSelector } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

interface ModalCreateAccountProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

const ModalWrapper = styled(Modal)`
  .ant-modal {
    border-radius: 20px;
  }

  .ant-modal-content {
    background: #303030;
    border-radius: 20px;
  }
`;

const ModalContainer = styled.div`
  background-color: #303030;
`;

const LabelInput = styled.p`
  font-size: 14px;
  color: #ffffff;
`;

const TextInput = styled(Input)`
  background-color: #252525;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  border-width: 0px;
  border: none;
  margin-top: 8px;

  ::placeholder {
    color: #757575;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #757575;
  }

  ::-ms-input-placeholder {
    color: #757575;
  }
`;

const TextInputContainer = styled.div`
  margin-top: 16px;
`;

export const ModalCreateAccount = (props: ModalCreateAccountProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { isModalOpen, onCloseModal } = props;

  const [keychainName, setKeychainName] = useState<string>('');

  const onChangeKeychainName = (value: string) => {
    setKeychainName(value);
  };

  const dispatch = useDispatch();

  const validateKeychainName = () => {
    if (isEmpty(keychainName)) {
      return false;
    }
    return true;
  };

  const listAccount = useSelector(listAccountSelector);

  const checkAccountExist = () => {
    const isAccountExist = listAccount.find(
      (account: any) => lowerCase(account?.accountName) === lowerCase(trim(keychainName))
    );
    return isAccountExist;
  };

  const handleCreateAccount = async () => {
    if (!validateKeychainName()) {
      return;
    }
    try {
      const isAccountExist = checkAccountExist();
      if (isAccountExist) {
        throw new CustomError(ErrorCode.createAccount_existed_name);
      }
      await dispatch(actionFetchCreateAccount({ accountName: trim(keychainName) }));
      messageApi.open({
        type: 'success',
        content: 'Create account successful.',
      });
      resetFormValue();
      onCloseModal?.();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  };

  const resetFormValue = () => {
    setKeychainName('');
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      centered
      width={600}
      footer={null}
      bodyStyle={{ padding: 24, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => {
        resetFormValue();
        onCloseModal?.();
      }}
    >
      {contextHolder}
      <ModalContainer>
        <h5>Create keychain</h5>
        <div>
          <TextInputContainer>
            <LabelInput>Keychain name</LabelInput>
            <TextInput
              value={keychainName}
              onChange={(e) => onChangeKeychainName?.(e.target.value)}
              placeholder="Enter Keychain Name"
            />
          </TextInputContainer>

          <ButtonConfirmed onClick={handleCreateAccount} height={'50px'} type="submit" style={{ marginTop: 32 }}>
            Create keychain
          </ButtonConfirmed>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};
