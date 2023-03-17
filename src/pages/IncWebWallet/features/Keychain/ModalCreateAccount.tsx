import { Input, message } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import { isEmpty, lowerCase, trim } from 'lodash';
import { CustomError, ErrorCode } from 'pages/IncWebWallet/services/exception';
import { useState } from 'react';
// import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchCreateAccount } from 'state/account';
import { listAccountSelector } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

const Container = styled.div`
  background-color: #303030;
  min-height: 600px;
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

export const ModalCreateAccount = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [keychainName, setKeychainName] = useState<string>('');

  const { closeModal } = useModal();

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
      closeModal?.();
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
    <>
      {contextHolder}
      <Container>
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
      </Container>
    </>
  );
};
