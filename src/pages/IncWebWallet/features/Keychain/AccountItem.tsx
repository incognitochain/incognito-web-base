import { message } from 'antd';
import { useMemo } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { actionSwitchAccountFetched, actionSwitchAccountFetching } from 'state/account';
import { defaultAccount, switchAccountSelector } from 'state/account/account.selectors';
import { switchMasterKey } from 'state/masterKey';
import styled from 'styled-components/macro';

interface AccountItemProps {
  name: string;
  paymentAddress: string;
  onClick: () => void;
  privateKey: string;
  masterKeyName: string;
}

const AccountItemContainer = styled.div`
  word-wrap: break-word;
  width: 100%;
  padding: 18px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #363636;
  border-radius: 12px;
  margin-top: 16px;
  :hover {
    cursor: pointer;
    background: #303030;
    border: 1px solid #363636;
  }
`;

const AccountItemLeftContainer = styled.div`
  width: 60px;
  align-items: center;
  justify-content: center;
`;

const AccountName = styled.p`
  font-size: 16px;
  color: #ffffff;
`;

const PaymentAddress = styled.p`
  font-size: 14px;
  color: #9c9c9c;
`;
const AccountItemRightContainer = styled.div`
  padding: 0px 16px;
  width: 100%;
  flex: 1;
`;

const AccountItem = (props: AccountItemProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { name, paymentAddress, onClick, privateKey, masterKeyName } = props;
  const account: any = useSelector(defaultAccount);

  const isCurrentAccount = useMemo(() => privateKey === account?.PrivateKey, [privateKey, account?.PrivateKey]);
  const switchingAccount = useSelector(switchAccountSelector);

  const dispatch = useDispatch();
  const onSwitchAccount = async () => {
    try {
      if (switchingAccount) {
        return;
      }
      await dispatch(actionSwitchAccountFetching());
      if (privateKey === account.PrivateKey) {
        throw new Error(`Your current account is "${name}"`);
        return;
      }
      await dispatch(switchMasterKey(masterKeyName, name));
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    } finally {
      await dispatch(actionSwitchAccountFetched());
    }
  };

  return (
    <AccountItemContainer onClick={onClick}>
      {contextHolder}
      <AccountItemLeftContainer
        onClick={(e) => {
          e.stopPropagation();
          onSwitchAccount();
        }}
      >
        {isCurrentAccount ? (
          <MdCheckBox size={24} color="#1A73E8" />
        ) : (
          <MdCheckBoxOutlineBlank color="#9C9C9C" size={24} />
        )}
      </AccountItemLeftContainer>
      <AccountItemRightContainer>
        <AccountName>{name}</AccountName>
        <PaymentAddress>{paymentAddress}</PaymentAddress>
      </AccountItemRightContainer>
    </AccountItemContainer>
  );
};

export default AccountItem;
