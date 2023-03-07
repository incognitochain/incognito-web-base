import { useState } from 'react';
import { useSelector } from 'react-redux';
import { groupMasterless } from 'state/masterKey';

import AccountItem from './AccountItem';
import KeychainSettings from './KeychainSettings';
import { ModalAccountDetail } from './ModalAccountDetail';

const ListMasterLess = () => {
  const groupAccounts = useSelector(groupMasterless);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!groupAccounts?.length) return null;

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
        accounts.child.map((account: any, index: any) => (
          <AccountItem
            key={index}
            name={account?.name}
            paymentAddress={account?.PaymentAddress}
            onClick={() => onSelectAccount(account)}
            privateKey={account?.PrivateKey}
            masterKeyName={account.MasterKeyName}
          />
        ))
      )}
      <ModalAccountDetail account={selectedAccount} isModalOpen={isModalOpen} onCloseModal={handleCancel} />
      <KeychainSettings isMasterless={true} />
    </div>
  );
};
export default ListMasterLess;
