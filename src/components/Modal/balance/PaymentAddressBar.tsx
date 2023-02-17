import { ReactComponent as IncognitoLogo } from 'assets/svg/incognito-logo.svg';
import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { defaultAccountPaymentAddressSelector } from 'state/account/account.selectors';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { shortenString } from 'utils';
const PaymentAddressBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .address-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    .content {
      margin-left: 10px;
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
  }

  .change-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: ${({ theme }) => theme.primary14};
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 8px;
  }

  .logo {
    width: 42px;
    height: 42px;
  }
`;

const PaymentAddressBar = (props: any) => {
  const incAccount = useSelector(incognitoWalletAccountSelector);
  const defaultAccountPaymentAddress = useSelector(defaultAccountPaymentAddressSelector);

  const incAddress = incAccount ? incAccount.paymentAddress : defaultAccountPaymentAddress || '';
  return (
    <PaymentAddressBarStyled>
      <div className="address-area">
        <IncognitoLogo className="logo" />
        <div className="content">
          <ThemedText.RegularLabel fontWeight={500} color="primary5">
            {!isEmpty(incAddress) && shortenString(incAddress, 8)}
          </ThemedText.RegularLabel>

          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            {'Connected with Incognito'}
          </ThemedText.SmallLabel>
        </div>
      </div>

      {/*<div*/}
      {/*  className="change-button button-hover"*/}
      {/*  onClick={() => {*/}
      {/*    console.log('Change TO DO');*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {'Change'}*/}
      {/*</div>*/}
    </PaymentAddressBarStyled>
  );
};

export default PaymentAddressBar;
