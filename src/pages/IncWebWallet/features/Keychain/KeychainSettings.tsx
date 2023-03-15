import { useModal } from 'components/Modal';
import ConfirmReScanCoin from 'pages/IncWebWallet/components/ConfirmReScanCoin';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentMasterKeySelector } from 'state/masterKey';
import styled from 'styled-components/macro';

import { ModalBackup } from './ModalBackup';
import { ModalCreateAccount } from './ModalCreateAccount';
import { ModalImportKeychain } from './ModalImportKeychain';
import { ModalPhrase } from './ModalPhrase';
interface ItemProps {
  label?: string;
  onClick?: () => void;
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const ItemTitle = styled.p`
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  padding: 16px 0px;
`;

const Item = (props: ItemProps) => {
  const { onClick, label } = props;
  return (
    <ItemContainer onClick={onClick}>
      <ItemTitle>{label}</ItemTitle>
    </ItemContainer>
  );
};

interface KeychainSettingsProps {
  isMasterless: boolean;
}

const KeychainSettings = (props: KeychainSettingsProps) => {
  const { isMasterless } = props;
  const { setModal } = useModal();
  const masterKey = useSelector(currentMasterKeySelector);
  const [isOpenModalPhrase, setIsOpenModalPhrase] = useState<boolean>(false);
  const [isOpenModalImportKeychain, setIsOpenModalImportKeychain] = useState<boolean>(false);
  const [isOpenModalCreateAccount, setIsOpenModalCreateAccount] = useState<boolean>(false);
  const [isOpenModalBackup, setIsOpenModalBackup] = useState<boolean>(false);

  let listItems: any = [];

  const reScanCoinOnClicked = useCallback(
    () =>
      setModal({
        data: <ConfirmReScanCoin />,
        title: '',
        isTransparent: true,
        closable: false,
      }),
    []
  );

  if (isMasterless) {
    listItems.push({
      key: 'Import a keychain',
      // icon: <ImportAKeyChainIcon />,
      name: 'Import a keychain',
      visible: true,
      onClick: () => {
        setIsOpenModalImportKeychain(true);
      },
      belongTo: ['Masterkey', 'Masterless'],
    });
  } else {
    listItems.push({
      key: 'Create a new keychain',
      // icon: <CreateNewKeyChainIcon />,
      name: 'Create a new keychain',
      visible: true,
      onClick: () => {
        setIsOpenModalCreateAccount(true);
      },
      belongTo: ['Masterkey'],
    });
    listItems.push({
      key: 'Reveal recovery phrase',
      // icon: <RevealRecoveryPhraseIcon />,
      name: 'Reveal recovery phrase',
      visible: true,
      onClick: () => {
        setIsOpenModalPhrase(true);
      },
      belongTo: ['Masterkey'],
    });
  }

  listItems.push({
    key: 'Back up',
    // icon: <BackupIcon />,
    name: 'Back up',
    visible: true,
    onClick: () => {
      setIsOpenModalBackup(true);
    },
    belongTo: ['Masterkey', 'Masterless'],
  });

  listItems.push({
    key: 'Rescan coins',
    // icon: <RestoreIcon />,
    name: 'Rescan coins',
    visible: true,
    onClick: reScanCoinOnClicked,
    belongTo: ['Masterkey', 'Masterless'],
  });

  return (
    <div style={{ flex: 1 }}>
      {listItems?.map((item: any, i: any) => {
        return <Item key={i} label={item.name} onClick={() => item?.onClick?.()} />;
      })}
      <ModalPhrase isModalOpen={isOpenModalPhrase} data={masterKey} onCloseModal={() => setIsOpenModalPhrase(false)} />
      <ModalImportKeychain
        isModalOpen={isOpenModalImportKeychain}
        onCloseModal={() => setIsOpenModalImportKeychain(false)}
      />
      <ModalCreateAccount
        isModalOpen={isOpenModalCreateAccount}
        onCloseModal={() => setIsOpenModalCreateAccount(false)}
      />
      <ModalBackup isModalOpen={isOpenModalBackup} onCloseModal={() => setIsOpenModalBackup(false)} />
    </div>
  );
};
export default KeychainSettings;
