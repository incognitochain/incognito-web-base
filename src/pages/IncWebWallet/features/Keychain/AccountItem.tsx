import { Container, Typography } from 'components/Core';
import { useMemo } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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

const ContainerWrapper = styled.div`
  margin-top: 10px;
  .container {
    word-wrap: break-word;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .leftView {
    align-items: center;
    justify-content: center;
  }

  .rigtView {
    flex: 1;
    width: 100%;
    margin-left: 16px;
  }
`;

const AccountItem = (props: AccountItemProps) => {
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
      toast.error(error?.message || 'Something went wrong');
    } finally {
      await dispatch(actionSwitchAccountFetched());
    }
  };

  return (
    <ContainerWrapper>
      <Container className="container" onClick={onClick}>
        <div
          className="leftView"
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
        </div>
        <div className="rigtView">
          <Typography.Text type="p1" fontWeight={600} textAlign="left">
            {name}
          </Typography.Text>
          <Typography.Text type="p2" fontWeight={500} textAlign="left" color="gray_9C9C9C">
            {paymentAddress}
          </Typography.Text>
        </div>
      </Container>
    </ContainerWrapper>
  );
};

export default AccountItem;
