import { useModal } from 'components/Modal';
import { useSelector } from 'react-redux';
import { groupMasterless } from 'state/masterKey';
import format from 'utils/format';

import AccountItem from './AccountItem';
import TabSetting from './KeychainSettings';
import { ModalAccountDetail } from './ModalAccountDetail';

const ListMasterLess = () => {
  const groupAccounts = useSelector(groupMasterless);

  const { setModal } = useModal();

  const onSelectAccount = (account: any) => {
    setModal({
      data: <ModalAccountDetail account={account} />,
      title: '',
      isTransparent: true,
      closable: true,
    });
  };

  return (
    <div>
      {groupAccounts?.map((accounts: any) =>
        accounts?.child?.map((account: any, index: any) => {
          const paymentAddress = format.shortCryptoAddress(account?.PaymentAddress, 20);
          return (
            <AccountItem
              key={index}
              name={account?.name}
              paymentAddress={paymentAddress}
              onClick={() => onSelectAccount(account)}
              privateKey={account?.PrivateKey}
              masterKeyName={account.MasterKeyName}
            />
          );
        })
      )}
      <TabSetting isMasterless={true} />
    </div>
  );
};
export default ListMasterLess;
