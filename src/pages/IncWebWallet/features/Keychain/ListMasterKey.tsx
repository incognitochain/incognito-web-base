import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccount, switchAccountSelector } from 'state/account/account.selectors';
import { groupMasterKeys, isLoadingAllMasterKeyAccountSelector } from 'state/masterKey';

import AccountItem from './AccountItem';
import TabSetting from './KeychainSettings';
import { ModalAccountDetail } from './ModalAccountDetail';

const ListMasterKey = () => {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const groupAccounts = useSelector(groupMasterKeys);
  const loading = useSelector(isLoadingAllMasterKeyAccountSelector);
  const account: any = useSelector(defaultAccount);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchingAccount = useSelector(switchAccountSelector);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectAccount = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };
  const renderItem = (account: any, index: any) => {
    return (
      <AccountItem
        onClick={() => onSelectAccount(account)}
        name={account?.name}
        paymentAddress={account?.PaymentAddress}
        key={account.ValidatorKey}
        privateKey={account?.PrivateKey}
        masterKeyName={account.MasterKeyName}
      />
    );
  };

  const dispatch = useDispatch();

  return (
    <>
      {contextHolder}
      <div>
        {groupAccounts.map((accounts: any) =>
          accounts.child.map((account: any, index: any) => renderItem(account, index))
        )}
        <ModalAccountDetail account={selectedAccount} isModalOpen={isModalOpen} onCloseModal={handleCancel} />
        <TabSetting isMasterless={false} />
      </div>
    </>
  );
};
export default ListMasterKey;
