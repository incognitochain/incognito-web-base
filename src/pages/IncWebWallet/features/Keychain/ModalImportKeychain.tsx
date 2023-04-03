import { Input } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import { isEmpty, trim } from 'lodash';
import { CustomError, ErrorCode } from 'pages/IncWebWallet/services/exception';
import { useState } from 'react';
// import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actionFetchImportAccount } from 'state/account';
import { switchKeychainType } from 'state/masterKey';
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

const ErrorFieldMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.error};
  margin-top: 4px;
`;

const TextInputContainer = styled.div`
  margin-top: 16px;
`;

export const ModalImportKeychain = () => {
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
      const isImported: any = await dispatch(
        actionFetchImportAccount({
          privateKey: trim(privateKey),
          accountName: trim(keychainName),
        })
      );
      if (isImported) {
        await dispatch(switchKeychainType('Masterless'));
      }
      if (!isImported) throw new CustomError(ErrorCode.importAccount_failed);
      toast.success('Import successful.');
      resetFormValue();
      closeModal?.();
    } catch (error) {
      toast.error(error?.message || 'Import keychain failed, please try again.');
      setImporting(false);
    }
  };

  return (
    <>
      <Container>
        <h5>Import a keychain</h5>
        <div>
          <TextInputContainer>
            <LabelInput>Keychain name</LabelInput>
            <TextInput
              value={keychainName}
              onChange={(e) => onChangeKeychainName?.(e.target.value)}
              placeholder="Enter Keychain Name"
              maxLength={50}
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
