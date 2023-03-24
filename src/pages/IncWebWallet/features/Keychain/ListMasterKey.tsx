import { useModal } from 'components/Modal';
import { useSelector } from 'react-redux';
import { groupMasterKeys } from 'state/masterKey';
import format from 'utils/format';

import AccountItem from './AccountItem';
import TabSetting from './KeychainSettings';
import { ModalAccountDetail } from './ModalAccountDetail';

const ListMasterKey = () => {
  const groupAccounts = useSelector(groupMasterKeys);

  const { setModal } = useModal();

  const onSelectAccount = (account: any) => {
    setModal({
      data: <ModalAccountDetail account={account} />,
      title: '',
      isTransparent: true,
      closable: true,
    });
  };
  const renderItem = (account: any, index: any) => {
    const paymentAddress = format.shortCryptoAddress(account?.PaymentAddress, 25);
    return (
      <AccountItem
        onClick={() => onSelectAccount(account)}
        name={account?.name}
        paymentAddress={paymentAddress}
        key={account.ValidatorKey}
        privateKey={account?.PrivateKey}
        masterKeyName={account.MasterKeyName}
      />
    );
  };

  return (
    <>
      <div>
        {groupAccounts.map((accounts: any) =>
          accounts.child.map((account: any, index: any) => renderItem(account, index))
        )}
        <TabSetting isMasterless={false} />
      </div>
    </>
  );
};
export default ListMasterKey;
