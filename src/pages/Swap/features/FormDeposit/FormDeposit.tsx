import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import QrCode from 'components/QrCode';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useSwitchNetwork from 'lib/hooks/useSwitchNetwork';
import debounce from 'lodash/debounce';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { useWalletModalToggle } from 'state/application/hooks';
import styled from 'styled-components/macro';

import { genDepositAddress, IDepositAddress } from '../../../../services/rpcClient';
import { getAcronymNetwork } from '../../../../utils/token';
import { Selection } from '../Selection';
import DescriptionBox from './components/DescriptionBox';
import DescriptionQrCode from './components/DescriptionQrCode';
import ShieldFeeEstimate from './components/ShieldFeeEstimate';
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
    inputAddress,
    isIncognitoAddress,
  } = props;

  const [state, setState] = React.useState<{ isFetching: boolean; data: IDepositAddress | undefined }>({
    isFetching: false,
    data: undefined,
  });

  const [onSwitchNetwork] = useSwitchNetwork({ targetChain: sellToken.chainID });
  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const [isShowQrCode, setShowQrCode] = useState(true);
  const _actionMetamask = () => {
    if (!account) return toggleWalletModal();
    return onSwitchNetwork(false);
  };

  const debounceGenDepositAddress = debounce(
    React.useCallback(async () => {
      if (!inputAddress || !isIncognitoAddress) return;
      setState({
        data: undefined,
        isFetching: true,
      });
      try {
        const data: IDepositAddress = await genDepositAddress({
          network: getAcronymNetwork(sellToken),
          incAddress: inputAddress,
          tokenID: sellToken.tokenID,
        });
        setState({
          data,
          isFetching: false,
        });
      } catch (e) {
        setState({
          data: undefined,
          isFetching: false,
        });
        console.log('GEN ADDRESS ERROR: ', e);
      }
    }, [inputAddress, isIncognitoAddress, sellToken.tokenID, sellToken.currencyType]),
    300
  );

  useEffect(() => {
    if (!inputAddress || !isIncognitoAddress) return;
    debounceGenDepositAddress();
  }, [inputAddress, isIncognitoAddress, sellToken.tokenID, sellToken.currencyType]);

  return (
    <Styled>
      {/*<form onSubmit={handleSubmit(onSend)}>*/}
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
      {/* <Selection
          title="To"
          rightValue={buyNetworkName}
          currency={PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}
          leftValue={buyToken.symbol}
          iconUrl={buyToken.iconUrl}
        />
        <VerticalSpace /> */}
      <Field
        component={InputField}
        name={FORM_CONFIGS.toAddress}
        inputType={INPUT_FIELD.address}
        leftTitle="Incognito Address"
        componentProps={{
          placeholder: 'Incognito Address',
        }}
        showIcon={false}
        validate={validateAddress}
        warning={warningAddress}
      />
      <VerticalSpace />
      {/* <Field
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
        /> */}
      <VerticalSpace />

      {isShowQrCode && (
        <div>
          <QrCode
            qrCodeProps={{
              value: state.data?.address || 'NON VALUE',
              size: 156,
            }}
            isBlur={!state.data?.address || !!state?.isFetching}
            isLoading={!!state?.isFetching}
          />
          <DescriptionQrCode symbol={sellToken.symbol} paymentAddress={state && state.data?.address} />
          {/*<MinimumShiledAmount />*/}
          <ShieldFeeEstimate value={`${state.data?.tokenFee || state.data?.estimateFee || 0} ${sellToken.symbol}`} />
          <DescriptionBox symbol={sellToken.symbol} />
        </div>
      )}
      {/* {button.switchNetwork || !account ? (
          <ButtonConfirmed type="button" onClick={_actionMetamask}>
            {button.text}
          </ButtonConfirmed>
        ) : (
          <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
        )} */}
      {/*</form>*/}
    </Styled>
  );
};

FormDeposit.displayName = 'FormDeposit';

export default enhance(FormDeposit) as any;
