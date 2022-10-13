import SwapIcon from 'assets/svg/swap.svg';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Selection } from 'pages/Swap/features/Selection';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { EstReceive } from '../EstReceive';
import { actionSetExchangeSelected } from './FormUnshield.actions';
import enhance, { IMergeProps } from './FormUnshield.enhance';
import { FormTypes, SwapExchange } from './FormUnshield.types';

const Styled = styled.div``;

const WrapSwapIcon = styled.div`
  width: 100%;
  height: 56px;
  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  .icon {
    margin-top: 16px;
    position: absolute;
    left: 46.5%;
  }
  .disable {
    opacity: 0.5;
    cursor: unset;
  }
  .swap-icon {
    cursor: pointer;
    :hover {
      transform: scale(1.2);
      transition-duration: 0.3s;
      opacity: 0.8;
    }
    :active {
      opacity: 0.5;
    }
  }
`;

const FormUnshield = React.memo((props: IMergeProps) => {
  const {
    handleSubmit,
    sellToken,
    sellTokenList,
    buyParentToken,
    buyToken,
    buyTokenList,
    buyNetworkList,
    buyCurrency,
    buyNetworkName,
    userBalanceFormatedText,
    button,
    inputAmount,
    networkFeeText,
    burnFeeText,

    validateAddress,
    warningAddress,
    onSelectSellToken,
    onSelectBuyToken,
    onSelectBuyNetwork,
    onRotateSwapToken,
    validateAmount,
    onClickMax,
    onSend,

    fee,
    formType,
    exchangeSelected,
    estReceiveAmount,
    exchangeSupports,
    tradePath,
    errorMsg,
    swapFee,
    isFetching,
    exchangeSelectedData,
    inputAddress,
  } = props;

  const { showPopup } = useIncognitoWallet();
  const [changing, setChanging] = React.useState(false);

  const _buttonAction = () => showPopup();

  const dispatch = useDispatch();

  const onSelectExchange = (exchangeName: any) => {
    dispatch(actionSetExchangeSelected(exchangeName));
  };

  const [visibleAddress, setVisibleAddress] = useState<boolean>(
    buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress ? true : false
  );

  useEffect(() => {
    if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress) {
      setVisibleAddress(true);
    } else {
      setVisibleAddress(false);
    }
  }, [sellToken.tokenID, buyToken.tokenID, buyNetworkName]);

  const rightLabelAddress = visibleAddress ? '- Send to' : '+ Send to';

  const getEstimateTime = () => {
    let time = '';
    let desc = '';
    if (formType === FormTypes.UNSHIELD) {
      time = fee.extraFee ? '6 hours' : '1 min';
      if (fee.extraFee) {
        desc = "Due to unified tokens' nature, the unshielding could take up to 6 hours.";
      }
    } else if (exchangeSelectedData?.appName) {
      const isReShield = buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO;
      const { appName, exchangeName } = exchangeSelectedData;
      if (appName === SwapExchange.PANCAKE_SWAP) {
        time = isReShield ? '2 mins' : '1 min';
      } else if (
        appName === SwapExchange.CURVE ||
        (appName === SwapExchange.UNISWAP && exchangeName.includes(MAIN_NETWORK_NAME.POLYGON))
      ) {
        time = isReShield ? '6 mins' : '1 min';
      } else {
        time = isReShield ? '5 mins' : '1 min';
      }
    }
    return { time, desc };
  };

  const { time, desc } = getEstimateTime();

  React.useEffect(() => {
    if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO) {
      setVisibleAddress(true);
    }
  }, [buyNetworkName]);

  return (
    <Styled>
      <form onSubmit={handleSubmit(onSend)}>
        <VerticalSpace />
        <Selection
          title="From"
          currency={PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}
          rightValue={MAIN_NETWORK_NAME.INCOGNITO}
          tokens={sellTokenList}
          leftValue={sellToken.symbol}
          iconUrl={sellToken.iconUrl}
          onSelectToken={onSelectSellToken}
          showNetwork={true}
        />
        {/*<VerticalSpace />*/}
        <WrapSwapIcon
          onClick={() => {
            if (formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
              onRotateSwapToken();
              setChanging(true);
              setTimeout(() => setChanging(false), 1000);
            }
          }}
        >
          <img
            className={`${
              formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? 'swap-icon' : 'disable'
            } icon`}
            style={{ animation: changing ? `spin ${0.8}s linear` : '' }}
            src={SwapIcon}
            alt="swap-svg"
          />
        </WrapSwapIcon>
        <Selection
          title="To"
          rightLabel={rightLabelAddress}
          rightLabelStyle={{ fontSize: 14, fontWeight: '500', color: 'white' }}
          onClickRightLabel={() => setVisibleAddress(!visibleAddress)}
          leftPlaceholder="Select token"
          rightPlaceholder="Select network"
          leftValue={buyParentToken.symbol}
          tokens={buyTokenList}
          iconUrl={buyParentToken.iconUrl}
          networks={buyNetworkList}
          currency={buyCurrency}
          rightValue={buyNetworkName}
          onSelectToken={onSelectBuyToken}
          onSelectNetwork={onSelectBuyNetwork}
          showNetwork={true}
        />
        <VerticalSpace />
        {visibleAddress && (
          <>
            <Field
              component={InputField}
              name={FORM_CONFIGS.toAddress}
              inputType={INPUT_FIELD.address}
              leftTitle="Address"
              componentProps={{
                placeholder:
                  buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? 'Your Incognito Address' : 'Your External Address',
                disabled: formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? true : false,
              }}
              validate={validateAddress}
              warning={warningAddress}
            />
            <VerticalSpace />
          </>
        )}
        <Field
          component={InputField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          leftTitle="Total amount"
          rightTitle={userBalanceFormatedText}
          showIcon={true}
          componentProps={{
            placeholder: 'Amount',
            type: 'number',
          }}
          validate={validateAmount}
          onClickMax={onClickMax}
        />
        <VerticalSpace />
        <EstReceive
          amountText={formType === FormTypes.SWAP ? estReceiveAmount?.toString() : inputAmount}
          symbol={buyToken.symbol || ''}
          networkFee={networkFeeText}
          burnFeeText={burnFeeText}
          time={time}
          desc={desc}
          exchanges={exchangeSupports}
          exchangeSelected={exchangeSelected}
          onSelectExchange={onSelectExchange}
          formType={formType}
          tradePath={tradePath}
          swapFee={swapFee}
          isFetchingFee={isFetching}
        />
        <VerticalSpace />
        {!!errorMsg && (
          <>
            <ThemedText.Error marginTop="4px" error className={`error`}>
              {errorMsg}
            </ThemedText.Error>
            <VerticalSpace />
          </>
        )}
        {button.isConnected ? (
          <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
        ) : (
          <ButtonConfirmed onClick={_buttonAction}>{button.text}</ButtonConfirmed>
        )}
      </form>
    </Styled>
  );
});

FormUnshield.displayName = 'FormUnshield';

export default enhance(FormUnshield);
