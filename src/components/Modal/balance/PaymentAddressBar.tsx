import React from 'react';
import { useSelector } from 'react-redux';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { shortenIncognitoAddress } from 'utils';

const PaymentAddressBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .address-area {
    flex-direction: column;
    justify-content: center;

    .addressTitle {
      font-size: 16px;
      line-height: 140%;
    }

    .addressStatus {
      height: 20px;
      font-size: 14px;
    }
  }

  .changeButton {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 8px;
    gap: 10px;
    padding: 10px 8px 10px 8px;
    background: ${({ theme }) => theme.primary14};
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 8px;
  }
`;

const PaymentAddressBar = (props: any) => {
  const incAccount = useSelector(incognitoWalletAccountSelector);
  const incAddress = incAccount ? incAccount.paymentAddress : '';
  return (
    <PaymentAddressBarStyled>
      <div className="address-area">
        <ThemedText.RegularLabel fontWeight={500} color="primary5">
          {shortenIncognitoAddress(incAddress, 8)}
        </ThemedText.RegularLabel>

        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {'Connected with Incognito'}
        </ThemedText.SmallLabel>
      </div>

      <div
        className="changeButton button-hover"
        onClick={() => {
          console.log('Change TO DO');
        }}
      >
        {'Change'}
      </div>
    </PaymentAddressBarStyled>
  );
};

export default PaymentAddressBar;
