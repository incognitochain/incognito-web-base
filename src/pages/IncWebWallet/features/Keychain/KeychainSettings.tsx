import { useModal } from 'components/Modal';
import ConfirmReScanCoin from 'pages/IncWebWallet/components/ConfirmReScanCoin';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { currentMasterKeySelector } from 'state/masterKey';
import styled from 'styled-components/macro';

import ModalBackup from './ModalBackup';
import { ModalCreateAccount } from './ModalCreateAccount';
import { ModalImportKeychain } from './ModalImportKeychain';
import ModalPhrase from './ModalPhrase';

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
  color: ${({ theme }) => theme.white};
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

  let listItems: any = [];

  const reScanCoinOnClicked = useCallback(
    () =>
      setModal({
        data: <ConfirmReScanCoin />,
        title: '',
        isTransparent: true,
        closable: true,
      }),
    []
  );

  const openModalCreateAccount = useCallback(
    () =>
      setModal({
        data: <ModalCreateAccount />,
        title: '',
        isTransparent: true,
        closable: true,
      }),
    []
  );

  const openModalImportKeychain = useCallback(
    () =>
      setModal({
        data: <ModalImportKeychain />,
        title: '',
        isTransparent: true,
        closable: true,
      }),
    []
  );

  const openModalBackup = useCallback(
    () =>
      setModal({
        data: <ModalBackup />,
        title: '',
        isTransparent: true,
        closable: true,
      }),
    []
  );

  const openModalPhrase = useCallback(
    () =>
      setModal({
        data: <ModalPhrase data={masterKey} />,
        title: '',
        isTransparent: true,
        closable: true,
      }),
    []
  );

  if (isMasterless) {
    listItems.push({
      key: 'Import a keychain',
      // icon: <ImportAKeyChainIcon />,
      name: 'Import a keychain',
      visible: true,
      onClick: openModalImportKeychain,
      belongTo: ['Masterkey', 'Masterless'],
    });
  } else {
    listItems.push({
      key: 'Create a new keychain',
      // icon: <CreateNewKeyChainIcon />,
      name: 'Create a new keychain',
      visible: true,
      onClick: openModalCreateAccount,
      belongTo: ['Masterkey'],
    });
    listItems.push({
      key: 'Reveal recovery phrase',
      // icon: <RevealRecoveryPhraseIcon />,
      name: 'Reveal recovery phrase',
      visible: true,
      onClick: openModalPhrase,
      belongTo: ['Masterkey'],
    });
  }

  listItems.push({
    key: 'Back up',
    // icon: <BackupIcon />,
    name: 'Back up',
    visible: true,
    onClick: openModalBackup,
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
    </div>
  );
};
export default KeychainSettings;
