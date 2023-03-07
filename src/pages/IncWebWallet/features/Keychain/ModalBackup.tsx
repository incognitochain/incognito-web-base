import { message, Modal } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import copy from 'copy-to-clipboard';
import { isEmpty } from 'lodash';
import { loadListAccount } from 'pages/IncWebWallet/services/wallet/walletService';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { listAllMasterKeyAccounts, masterlessWalletSelector, noMasterLessSelector } from 'state/masterKey';
import styled from 'styled-components/macro';

const ModalWrapper = styled(Modal)`
  .ant-modal {
    border-radius: 20px;
  }

  .ant-modal-content {
    background: #303030;
    border-radius: 20px;
  }
`;

const ExportItemContainer = styled.div`
  padding: 8px 0px;
`;

const ExportItemTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemValue = styled.p`
  color: #9c9c9c;
`;

const ButtonCopy = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const ButtonQrCode = styled.div`
  margin-left: 8px;
  :hover {
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  background-color: #303030;
  text-align: center;
`;

const Box = styled.div`
  padding: 32px;
  box-shadow: 0px 4px 12px #757575;
  margin-top: 32px;
  border-radius: 8px;
`;

const PhraseText = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

interface ItemProps {
  label: string;
  value: string;
}

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

const Item = (props: ItemProps) => {
  const { label, value } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const onCopy = (text: string) => {
    copy(text);
    messageApi.open({
      type: 'success',
      content: 'Copied',
    });
  };
  return (
    <ExportItemContainer>
      {contextHolder}
      <ExportItemTopContainer>
        <p>{label}</p>
        <GroupButton>
          <ButtonCopy onClick={() => onCopy(value)}>
            <MdContentCopy size={20} color="#FFFFFF" />
          </ButtonCopy>
          <ButtonQrCode>
            <MdQrCode size={20} color="#FFFFFF" />
          </ButtonQrCode>
        </GroupButton>
      </ExportItemTopContainer>
      <ItemValue>{value}</ItemValue>
    </ExportItemContainer>
  );
};

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface ModalPhraseProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ModalBackup = (props: ModalPhraseProps) => {
  const { isModalOpen, onCloseModal } = props;

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

  const markBackedUp = () => {
    // storageService.setItem(CONSTANT_KEYS.IS_BACKEDUP_ACCOUNT, JSON.stringify(true));
  };

  const handleCopyAll = () => {
    // clipboard.set(backupDataStr, { copiedMessage: 'All keys copied' });
    markBackedUp();
  };

  const renderAccountItem = (name: any, key: any) => {
    return <p>dsfs</p>;
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      centered
      width={600}
      footer={null}
      bodyStyle={{ padding: 24, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => onCloseModal?.()}
    >
      <ModalContainer>
        <h5>Backup private keys</h5>
        <div>
          <p>Master keys</p>
          {noMasterless.length > 0 &&
            noMasterless?.map((pair: any) => {
              const [name, key] = getNameKey(pair);
              return renderAccountItem(name, key);
            })}
        </div>
        <div>
          <p>Master keys</p>
          {masterless?.map((pair: any) => {
            const [name, key] = getNameKey(pair);
            return renderAccountItem(name, key);
          })}
        </div>
        <div>
          <ButtonQrCode />
          <ButtonConfirmed height={'50px'} type="submit" style={{ marginTop: 32 }}>
            Copy all keys
          </ButtonConfirmed>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};
