import { ReactComponent as IncognitoLogo } from 'assets/svg/incognito-logo.svg';
import CopyIcon from 'components/Copy';
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
  padding: 0px 12px 0px 12px;
  .address-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    .content {
      margin-left: 10px;

      .row {
        display: flex;
        flex-direction: row;

        gap: 1.2rem;

        .addressTitle {
          font-weight: 400;
          font-size: 16px;
          line-height: 140%;
          display: flex;
          flex-wrap: wrap;
        }
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

  let incAddress;
  if (incAccount && incAccount.paymentAddress && incAccount.paymentAddress.length > 0) {
    incAddress = incAccount.paymentAddress;
  } else {
    incAddress = defaultAccountPaymentAddress || '';
  }

  return (
    <PaymentAddressBarStyled>
      <div className="address-area">
        <IncognitoLogo className="logo" />
        <div className="content">
          <div className="row">
            <p className="addressTitle">{!isEmpty(incAddress) && shortenString(incAddress, 8)}</p>
            <CopyIcon text={!isEmpty(incAddress) ? incAddress : ''} size={20} />
          </div>
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
