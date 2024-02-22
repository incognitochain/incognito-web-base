import { ButtonConfirmed } from 'components/Core/Button';
import { useModal } from 'components/Modal';
import copy from 'copy-to-clipboard';
import { isEmpty } from 'lodash';
import withBlur from 'pages/IncWebWallet/hoc/withBlur';
import { loadListAccount } from 'pages/IncWebWallet/services/wallet/walletService';
import React from 'react';
import { MdQrCode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { listAllMasterKeyAccounts, masterlessWalletSelector, noMasterLessSelector } from 'state/masterKey';
import styled from 'styled-components/macro';

import QRCode from '../QRCode';
import CopyItem from './CopyItem';

const ButtonQrCode = styled.div`
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  max-height: 600px;
  overflow-y: auto;
`;

const Label = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.white};
  margin-top: 16px;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const getNameKey = (obj: any) => {
  const name = Object.keys(obj)[0];
  const key = Object.values(obj)[0];

  return [name, key];
};

const convertToString = (masterless: any, noMasterless: any) => {
  let backupString = '';
  if (noMasterless?.length > 0) {
    backupString += '------MASTER KEYS------\n\n';
    backupString +=
      noMasterless
        ?.map((pair: any) => {
          const [name, key] = getNameKey(pair);
          return `AccountName: ${name}\nPhrase: ${key}`;
        })
        ?.join('\n\n') || '';
  }
  if (masterless?.length > 0) {
    backupString += '\n\n------MASTERLESS------\n\n';
    backupString +=
      masterless
        ?.map((pair: any) => {
          const [name, key] = getNameKey(pair);
          return `AccountName: ${name}\nPrivateKey: ${key}`;
        })
        ?.join('\n\n') || '';
  }
  return backupString;
};

const getBackupData = (accounts: any, masterKeys: any) => {
  try {
    const masterless = [];
    const noMasterless = [];
    if (accounts instanceof Array) {
      for (let account of accounts) {
        masterless.push({ [account?.name || account?.AccountName]: account?.PrivateKey });
      }
    }

    if (masterKeys instanceof Array) {
      for (let masterKey of masterKeys) {
        if (masterKey.name) {
          noMasterless.push({ [masterKey.name]: masterKey?.mnemonic });
        }
      }
    }
    return {
      masterless,
      noMasterless,
      backupDataStr: convertToString(masterless, noMasterless),
    };
  } catch (e) {
    // new ExHandler(e, 'Please try again').showErrorToast();
  }
};

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface ModalPhraseProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  children?: React.ReactNode;
}

const ModalBackup = (props: ModalPhraseProps) => {
  const listAccount = useSelector(listAllMasterKeyAccounts);

  const masterKeys = useSelector(noMasterLessSelector);
  const masterlessWallet = useSelector(masterlessWalletSelector);
  const [state, setState] = React.useState<any>({
    masterless: [],
    noMasterless: [],
    backupDataStr: '',
  });

  let masterlessAccounts = listAccount;

  const { masterless, noMasterless, backupDataStr } = state;

  const loadMasterlessAccounts = async () => {
    if (isEmpty(masterlessAccounts) && masterlessWallet) {
      masterlessAccounts = (await loadListAccount(masterlessWallet)) || [];
    }
    setState({ ...state, ...getBackupData(masterlessAccounts, masterKeys) });
  };

  React.useEffect(() => {
    loadMasterlessAccounts().then();
  }, [masterlessWallet]);

  const handleCopyAll = () => {
    copy(backupDataStr);
    toast.success('All keys copied');
  };

  const { setModal } = useModal();

  const onClickQrCode = (label: string, value: string) => {
    setModal({
      closable: false,
      data: <QRCode title={label} value={value} />,
      isTransparent: false,
      rightHeader: undefined,
      title: '',
      isSearchTokenModal: false,
      hideHeaderDefault: true,
    });
  };

  const renderAccountItem = (name: any, key: any) => {
    return <CopyItem label={name} value={key} handleClickQrCode={() => onClickQrCode(name, key)} />;
  };

  return (
    <>
      <h5>Backup private keys</h5>
      <ModalContainer>
        <div>
          <Label>Master keys</Label>
          {noMasterless.length > 0 &&
            noMasterless?.map((pair: any) => {
              const [name, key] = getNameKey(pair);
              return renderAccountItem(name, key);
            })}
        </div>
        <div>
          <Label>Master less</Label>
          {masterless?.map((pair: any) => {
            const [name, key] = getNameKey(pair);
            return renderAccountItem(name, key);
          })}
        </div>
      </ModalContainer>
      <BottomContainer>
        <ButtonQrCode onClick={() => onClickQrCode('Back up private keys', backupDataStr)}>
          <MdQrCode size={25} color="#000000" />
        </ButtonQrCode>
        <ButtonConfirmed onClick={handleCopyAll} height={'50px'} type="submit">
          Copy all keys
        </ButtonConfirmed>
      </BottomContainer>
    </>
  );
};

export default withBlur(ModalBackup);
