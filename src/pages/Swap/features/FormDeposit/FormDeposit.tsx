import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import styled from 'styled-components/macro';

import { Selection } from '../Selection';
import enhance from './FormDeposit.enhance';
import { TInner as TInnerAddress } from './FormDeposit.enhanceAddressValidator';
import { TInter as TInnerSelect } from './FormDeposit.enhanceSelect';
import { IDeposit } from './FormDeposit.hook';

const Styled = styled.div``;
interface IProps extends InjectedFormProps<any, any>, IDeposit, TInnerAddress, TInnerSelect {}

const FormDeposit = (props: IProps) => {
  const {
    handleSubmit,
    button,
    validateAddress,
    warningAddress,
    disabledForm,
    sellNetworkList,
    sellTokenList,
    onSelectNetwork,
    onSelectToken,
    sellNetworkName,
    sellToken,

    buyToken,
    buyNetworkName,
  } = props;
  const handleDeposit = () => console.log('DEPOSIT');

  return (
    <Styled>
      <form onSubmit={handleSubmit(handleDeposit)}>
        <VerticalSpace />
        <Selection
          title="From"
          leftValue={sellToken.symbol}
          rightValue={sellNetworkName}
          tokens={sellTokenList}
          iconUrl={sellToken.iconUrl}
          networks={sellNetworkList}
          onSelectToken={onSelectToken}
          onSelectNetwork={onSelectNetwork}
          currency={sellToken.currencyType}
        />
        <VerticalSpace />
        <Selection
          title="To"
          rightValue={buyNetworkName}
          currency={PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}
          leftValue={buyToken.symbol}
          iconUrl={buyToken.iconUrl}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Incognito Address',
          }}
          validate={validateAddress}
          warning={warningAddress}
        />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          leftTitle="Total amount"
          componentProps={{
            placeholder: 'Amount',
            type: 'number',
          }}
        />
        <VerticalSpace />
        <ButtonConfirmed type="submit" disabled={button.disabled || disabledForm}>
          {button.text}
        </ButtonConfirmed>
      </form>
    </Styled>
  );
};

FormDeposit.displayName = 'FormDeposit';

export default enhance(FormDeposit) as any;
