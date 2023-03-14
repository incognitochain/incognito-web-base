import { useState } from 'react';
import { useSelector } from 'react-redux';
import { groupMasterless } from 'state/masterKey';
import format from 'utils/format';

import AccountItem from './AccountItem';
import TabSetting from './KeychainSettings';
import { ModalAccountDetail } from './ModalAccountDetail';

const ListMasterLess = () => {
  const groupAccounts = useSelector(groupMasterless);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectAccount = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {groupAccounts.map((accounts: any) =>
        accounts.child.map((account: any, index: any) => {
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
      <ModalAccountDetail account={selectedAccount} isModalOpen={isModalOpen} onCloseModal={handleCancel} />
      <TabSetting isMasterless={true} />
    </div>
  );
};
export default ListMasterLess;
