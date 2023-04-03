import { Input } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import { isEmpty, lowerCase, trim } from 'lodash';
import { CustomError, ErrorCode } from 'pages/IncWebWallet/services/exception';
import { useState } from 'react';
// import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { actionFetchCreateAccount } from 'state/account';
import { listAccountSelector } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  min-height: 600px;
`;

const LabelInput = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.white};
`;

const TextInput = styled(Input)`
  background-color: #252525;
  color: ${({ theme }) => theme.white};
  padding: 12px;
  border-radius: 8px;
  border-width: 0px;
  border: none;
  margin-top: 8px;

  ::placeholder {
    color: ${({ theme }) => theme.text5};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${({ theme }) => theme.text5};
  }

  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.text5};
  }
`;

const TextInputContainer = styled.div`
  margin-top: 16px;
`;

const TextInputErrorMsg = styled.div`
  color: ${({ theme }) => theme.error};
  margin-top: 4px;
`;

export const ModalCreateAccount = () => {
  // form value
  const [keychainName, setKeychainName] = useState<string>('');

  // form error
  const [errorKeychainNameMsg, setErrorKeychainNameMsg] = useState<string>('');

  const { closeModal } = useModal();

  const onChangeKeychainName = (value: string) => {
    setKeychainName(value);
    validateKeychainName(value);
  };

  const dispatch = useDispatch();

  const validateKeychainName = (value: string) => {
    if (isEmpty(value)) {
      setErrorKeychainNameMsg('Please enter keychain name');
      return false;
    } else {
      setErrorKeychainNameMsg('');
      return true;
    }
  };

  const listAccount = useSelector(listAccountSelector);

  const checkAccountExist = () => {
    const isAccountExist = listAccount.find(
      (account: any) => lowerCase(account?.accountName) === lowerCase(trim(keychainName))
    );
    return isAccountExist;
  };

  const handleCreateAccount = async () => {
    if (!validateKeychainName(keychainName)) {
      return;
    }
    try {
      const isAccountExist = checkAccountExist();
      if (isAccountExist) {
        throw new CustomError(ErrorCode.createAccount_existed_name);
      }
      await dispatch(actionFetchCreateAccount({ accountName: trim(keychainName) }));
      toast.success('Create account successful.');
      resetFormValue();
      closeModal?.();
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  const resetFormValue = () => {
    setKeychainName('');
  };

  return (
    <>
      <Container>
        <h5>Create keychain</h5>
        <div>
          <TextInputContainer>
            <LabelInput>Keychain name</LabelInput>
            <TextInput
              value={keychainName}
              onChange={(e) => onChangeKeychainName?.(e.target.value)}
              placeholder="Enter Keychain Name"
              maxLength={50}
            />
            <TextInputErrorMsg>{errorKeychainNameMsg}</TextInputErrorMsg>
          </TextInputContainer>
          <ButtonConfirmed onClick={handleCreateAccount} height={'50px'} type="submit" style={{ marginTop: 32 }}>
            Create keychain
          </ButtonConfirmed>
        </div>
      </Container>
    </>
  );
};
