import { Typography } from 'components/Core';
import { useModal } from 'components/Modal';
import ConfirmReScanCoin from 'pages/IncWebWallet/components/ConfirmReScanCoin';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentMasterKeySelector,
  groupMasterless,
  keychainTypeSelector,
  loadAllMasterKeyAccounts,
} from 'state/masterKey';
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
  margin-top: 15px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Item = (props: ItemProps) => {
  const { onClick, label } = props;
  return (
    <ItemContainer onClick={onClick}>
      <Typography.Text type="h6" fontWeight={600} textAlign="left">
        {label}
      </Typography.Text>
    </ItemContainer>
  );
};

interface KeychainSettingsProps {
  isMasterless: boolean;
}

const KeychainSettings = (props: KeychainSettingsProps) => {
  const { setModal } = useModal();

  const listMasterLess = useSelector(groupMasterless);
  const keychainType = useSelector(keychainTypeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllMasterKeyAccounts());
  }, []);

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

  listItems.push({
    key: 'Import a keychain',
    // icon: <ImportAKeyChainIcon />,
    name: 'Import a keychain',
    visible: true,
    onClick: openModalImportKeychain,
    belongTo: ['Masterkey', 'Masterless'],
  });

  if (keychainType === 'Masterkey') {
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

  if (keychainType === 'Masterkey' || listMasterLess?.length) {
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
  }

  return (
    <div style={{ flex: 1 }}>
      {listItems?.map((item: any, i: any) => {
        return <Item key={i} label={item.name} onClick={() => item?.onClick?.()} />;
      })}
    </div>
  );
};
export default KeychainSettings;
