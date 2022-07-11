import { memo } from 'react';
import { useSelector } from 'react-redux';
import { incognitoWalletAccountsSelector } from 'state/incognitoWallet';
import styled from 'styled-components/macro';
const Styled = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  right: 100px;
  bottom: 100px;
  padding: 10px;
  background-color: #191919;
`;
const AccountInfoList = () => {
  // const dispatch = useDispatch();
  const accountList = useSelector(incognitoWalletAccountsSelector);
  if (!accountList || accountList.length < 1) return null;
  return (
    <Styled>
      {accountList.map((account, index) => {
        const { balances = [], keyDefine, paymentAddress } = account;
        return (
          <div key={index}>
            <p>{`PaymentAddress: ${account.paymentAddress}`}</p>
            {balances.map((balance, index) => {
              return (
                <div key={index}>
                  <p>{`amount: ${balance.amount}`}</p>
                  <p>{`id: ${balance.id}`}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </Styled>
  );
};

export default memo(AccountInfoList);
