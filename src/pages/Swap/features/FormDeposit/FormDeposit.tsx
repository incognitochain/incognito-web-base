import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useSwitchNetwork from 'lib/hooks/useSwitchNetwork';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import { useWalletModalToggle } from 'state/application/hooks';
import styled from 'styled-components/macro';

import { Selection } from '../Selection';
import enhance, { IMergeProps } from './FormDeposit.enhance';

const Styled = styled.div``;

const FormDeposit = (props: IMergeProps) => {
  const {
    handleSubmit,
    button,
    sellNetworkList,
    sellTokenList,
    sellNetworkName,
    sellToken,

    buyToken,
    buyNetworkName,

    amount,

    validateAddress,
    warningAddress,
    validateAmount,

    onSelectNetwork,
    onSelectToken,
    onClickMax,
    onSend,
  } = props;

  const [onSwitchNetwork] = useSwitchNetwork({ targetChain: sellToken.chainID });
  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  const _actionMetamask = () => {
    if (!account) return toggleWalletModal();
    return onSwitchNetwork(false);
  };

  return (
    <Styled>
      <form onSubmit={handleSubmit(onSend)}>
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
          showNetwork={true}
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
          rightTitle={amount.maxAmountFormatedText}
          componentProps={{
            placeholder: 'Amount',
            type: 'number',
          }}
          validate={validateAmount}
          onClickMax={onClickMax}
        />
        <VerticalSpace />
        {button.switchNetwork || !account ? (
          <ButtonConfirmed type="button" onClick={_actionMetamask}>
            {button.text}
          </ButtonConfirmed>
        ) : (
          <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
        )}
      </form>
    </Styled>
  );
};

FormDeposit.displayName = 'FormDeposit';

export default enhance(FormDeposit) as any;
