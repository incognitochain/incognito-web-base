import { Input, message } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import { isEmpty, trim } from 'lodash';
import { CustomError, ErrorCode } from 'pages/IncWebWallet/services/exception';
import { useState } from 'react';
// import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { actionFetchImportAccount } from 'state/account';
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

const ErrorFieldMessage = styled.p`
  font-size: 14px;
  color: #f6465d;
  margin-top: 4px;
`;

const TextInputContainer = styled.div`
  margin-top: 16px;
`;

export const ModalImportKeychain = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // Form value
  const [keychainName, setKeychainName] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');

  // Form field error message
  const [errorKeychainNameMsg, setErrorKeychainNameMsg] = useState<string>('');
  const [errorPrivateKeyMsg, setErrorPrivateKeyMsg] = useState<string>('');

  const [importing, setImporting] = useState<boolean>(false);

  const { closeModal } = useModal();

  const onChangeKeychainName = (value: string) => {
    setKeychainName(value);
    validateKeychainName(value);
  };

  const onChangePrivateKey = (value: string) => {
    setPrivateKey(value);
    validatePrivateKey(value);
  };

  const dispatch = useDispatch();

  // =====================================================
  // VALIDATE FORM
  // =====================================================
  const validateKeychainName = (value: string) => {
    if (isEmpty(value)) {
      setErrorKeychainNameMsg('Please enter keychain name');
      return false;
    } else {
      setErrorKeychainNameMsg('');
      return true;
    }
  };

  const validatePrivateKey = (value: string) => {
    if (isEmpty(value)) {
      setErrorPrivateKeyMsg('Please enter private key');
      return false;
    } else {
      setErrorPrivateKeyMsg('');
      return true;
    }
  };

  const validateForm = () => {
    const isValidateKeychainName = validateKeychainName(keychainName);
    const isValidatePrivateKey = validatePrivateKey(privateKey);
    if (isValidateKeychainName && isValidatePrivateKey) {
      return true;
    }
    return false;
  };

  const resetFormValue = () => {
    setKeychainName('');
    setPrivateKey('');
    setErrorKeychainNameMsg('');
    setErrorPrivateKeyMsg('');
  };

  const handleImportAccount = async () => {
    if (!validateForm()) return;
    try {
      setImporting(true);
      const isImported = await dispatch(
        actionFetchImportAccount({
          privateKey: trim(privateKey),
          accountName: trim(keychainName),
        })
      );
      if (!isImported) throw new CustomError(ErrorCode.importAccount_failed);
      messageApi.open({
        type: 'success',
        content: 'Import successful.',
      });
      resetFormValue();
      closeModal?.();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message || 'Import keychain failed, please try again.',
      });
      setImporting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Container>
        <h5>Import a keychain</h5>
        <div>
          <TextInputContainer>
            <LabelInput>Keychain name</LabelInput>
            <TextInput
              value={keychainName}
              onChange={(e) => onChangeKeychainName?.(e.target.value)}
              placeholder="Enter Keychain Name"
            />
            {errorKeychainNameMsg && <ErrorFieldMessage>{errorKeychainNameMsg}</ErrorFieldMessage>}
          </TextInputContainer>

          <TextInputContainer>
            <LabelInput>Private key</LabelInput>
            <TextInput
              value={privateKey}
              onChange={(e) => onChangePrivateKey?.(e.target.value)}
              placeholder="Enter Private Key"
            />
            {errorPrivateKeyMsg && <ErrorFieldMessage>{errorPrivateKeyMsg}</ErrorFieldMessage>}
          </TextInputContainer>

          <ButtonConfirmed onClick={handleImportAccount} height={'50px'} type="submit" style={{ marginTop: 32 }}>
            Import
          </ButtonConfirmed>
        </div>
      </Container>
    </>
  );
};
