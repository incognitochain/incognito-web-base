/* eslint-disable react/no-unknown-property */
import { InputField, validator } from 'components/Core/ReduxForm';
import PToken from 'models/model/pTokenModel';
import { FORM_OFFER_POPENSEA } from 'pages/POpenseaNFTDetail/POpenseaNFTDetail.constant';
import React, { memo } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import POpenseaSelectTokenDropdown from '../DropdownSelectToken/POpenseaSelectToken.dropdown';

export const Styled = styled.div`
  margin-top: 8px;
  width: 100%;

  .note {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
    margin-bottom: 16px;
  }

  .error-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .current-error {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.content4};
    }

    .total-offer {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
    }
  }

  .duration-dropdown {
    background-color: #252525;
  }

  .input-price-container {
    display: flex;
    flex-direction: row;
    /* align-items: center; */

    .price-input {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: -10px;
      margin-top: -1px;
    }
  }
`;

interface ModalOfferFormProps {
  isValidPrice: boolean;
  incAccount?: any;
  onDeposit: () => void;
  selectedToken?: PToken;
  tokens: PToken[];
  onSelectToken: (token: PToken) => void;
}

const ModalOfferForm = (props: ModalOfferFormProps) => {
  const { isValidPrice, incAccount, selectedToken, tokens, onSelectToken } = props;

  const renderError = () => (
    <div className="error-container">
      <p className="current-error">
        {!isValidPrice && incAccount && 'Your balance is insufficient.'}{' '}
        {!isValidPrice && incAccount && (
          <span onClick={props.onDeposit} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            deposit now
          </span>
        )}
      </p>
      <p className="total-offer">{isValidPrice ? `Total offer amount: 0 ETH` : ''}</p>
    </div>
  );

  return (
    <Styled>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Field
          component={InputField}
          name={FORM_OFFER_POPENSEA.recipitentAddress}
          componentProps={{
            placeholder: 'Recipient Address',
          }}
          validate={validator.combinedEtherAddress}
        />
        <p className="note">
          (*) this is an Ethereum address that the buying NFT will be sent to, we recommend using a fresh address here
          to maximize your anonymity.
        </p>
        <div className="input-price-container">
          <div className="price-input">
            <Field
              component={InputField}
              name={FORM_OFFER_POPENSEA.offerPriceAddress}
              componentProps={{
                placeholder: 'Price',
              }}
              validate={validator.combinedAmount}
            />
          </div>
          <POpenseaSelectTokenDropdown
            backgroundColor="#252525"
            selectedToken={selectedToken}
            tokens={tokens}
            onSelectToken={onSelectToken}
          />
        </div>
        {renderError()}
      </form>
    </Styled>
  );
};

export default memo(ModalOfferForm);
