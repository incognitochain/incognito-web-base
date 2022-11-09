import SwapIcon from 'assets/svg/swap.svg';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import SelectionField from 'components/Core/ReduxForm/SelectionField';
import { VerticalSpace } from 'components/Core/Space';
import { TAB_LIST } from 'components/Core/Tabs';
import { changeTab } from 'components/Core/Tabs/Tabs.reducer';
import { MAIN_NETWORK_NAME, PRV } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { EstReceive } from '../EstReceive';
import { actionSetToken } from '../FormDeposit/FormDeposit.actions';
import { actionSetExchangeSelected } from './FormUnshield.actions';
import enhance from './FormUnshield.enhance';
import { FormTypes, SwapExchange } from './FormUnshield.types';

const Styled = styled.div`
  .buy-section-style {
  }
  .max-text {
    padding-left: 15px;
    font-size: 18px;
    :hover {
      opacity: 0.8;
    }
    color: ${({ theme }) => theme.btn1};
  }
  .send-to-text {
    padding-left: 15px;
    :hover {
      opacity: 0.8;
    }
  }
`;

const WrapSwapIcon = styled.div`
  width: 100%;
  position: relative;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
  .icon {
    position: absolute;
    left: 46.5%;
    top: -20px;
    :hover {
      transform: scale(1.2);
    }
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
  .link {
    display: contents;
  }
`;

const ErrorMsgContainer = styled.div`
  padding: 15px 16px 15px 16px;
  border: 1px solid #f6465d;
  border-radius: 8px;
  margin-top: 4px;
`;

const FormUnshield = React.memo((props: any) => {
  const {
    handleSubmit,
    sellToken,
    sellTokenList,
    buyParentToken,
    buyToken,
    buyTokenList,
    buyNetworkList,
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
    expectedReceiveAmount,
    exchangeSupports,
    tradePath,
    errorMsg,
    swapFee,
    isFetching,
    exchangeSelectedData,
    inputAddress,

    userBuyBalanceFormatedText,
    rate,
  } = props;

  const { isIncognitoInstalled } = useIncognitoWallet();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);

  const { showPopup } = useIncognitoWallet();
  const [changing, setChanging] = React.useState(false);
  const prvToken = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);

  const _buttonAction = () => showPopup();

  const dispatch = useDispatch();

  const onSelectExchange = (exchangeName: any) => {
    dispatch(actionSetExchangeSelected(exchangeName));
  };

  const [visibleAddress, setVisibleAddress] = useState<boolean>(
    buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress
  );

  const onTopUpCoins = () => {
    let _sellToken = sellToken;
    if (_sellToken.isUnified || _sellToken.isPRV) {
      if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO) {
        _sellToken = (_sellToken.listUnifiedToken || []).find((token: any) => token.networkName === buyNetworkName);
        if (!_sellToken) {
          _sellToken = _sellToken.listUnifiedToken[0];
        }
      } else {
        _sellToken = _sellToken.listUnifiedToken[0];
      }
    }
    dispatch(actionSetToken({ sellToken: _sellToken }));
    setTimeout(async () => {
      // dispatch(
      //   await actionFilterTokenByNetwork({
      //     network: {
      //       parentIdentify: _sellToken.parentTokenID,
      //       identify: _sellToken.identify,
      //       chainID: _sellToken.chainID,
      //       networkName: _sellToken.networkName,
      //       currency: _sellToken.currencyType,
      //     },
      //   })
      // );
      dispatch(changeTab({ tab: TAB_LIST.SWAP.tabNames[1], rootTab: TAB_LIST.SWAP.rootTab }));
    }, 100);
  };

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

  useEffect(() => {
    if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO) {
      setVisibleAddress(true);
    } else {
      setVisibleAddress(false);
    }
  }, [sellToken.tokenID, buyToken.tokenID, buyNetworkName]);

  return (
    <Styled>
      <form onSubmit={handleSubmit(onSend)}>
        <VerticalSpace />
        <Field
          component={SelectionField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          // headerTitle="From"
          tokens={sellTokenList}
          tokenSymbol={sellToken.symbol}
          tokenImgUrl={sellToken.iconUrl}
          tokenNetwork={sellToken.network}
          onSelectToken={onSelectSellToken}
          networkName={MAIN_NETWORK_NAME.INCOGNITO}
          amount={userBalanceFormatedText}
          onClickFooterRight={onClickMax}
          footerRightClass="max-text"
          componentProps={{
            type: 'number',
          }}
          validate={validateAmount}
          showShowTopUp={true}
          onTopUp={onTopUpCoins}
          tokenAmountNum={sellToken.amount}
        />
        <WrapSwapIcon>
          <img
            className={`${formType === FormTypes.SWAP ? 'swap-icon' : 'disable'} icon`}
            style={{ animation: changing ? `spin ${0.6}s linear` : '', width: 40, height: 40 }}
            onClick={() => {
              if (formType === FormTypes.SWAP && !changing) {
                onRotateSwapToken();
                setChanging(true);
                setTimeout(() => setChanging(false), 1000);
              }
            }}
            src={SwapIcon}
            alt="swap-svg"
          />
        </WrapSwapIcon>
        <Field
          component={SelectionField}
          name={FORM_CONFIGS.buyAmount}
          inputType={INPUT_FIELD.amount}
          className="buy-section-style"
          // headerTitle="To"
          tokens={buyTokenList}
          tokenSymbol={!!buyParentToken ? buyParentToken?.symbol : ''}
          tokenImgUrl={!!buyParentToken ? buyParentToken?.iconUrl : ''}
          networks={buyNetworkList}
          networkName={buyNetworkName}
          amount={userBuyBalanceFormatedText}
          onSelectToken={onSelectBuyToken}
          onSelectNetwork={onSelectBuyNetwork}
          receiveValue={formType === FormTypes.SWAP ? expectedReceiveAmount || '0' : inputAmount}
          footerRightText={rightLabelAddress}
          isUseInput={false}
          footerRightClass="send-to-text"
          tokenNetwork={buyToken.network}
          onClickFooterRight={() => setVisibleAddress((value) => !value)}
          componentProps={{
            type: 'number',
            disabled: true,
          }}
        />
        {!prvToken.amount && !!inputAmount && isIncognitoInstalled() && incAccount ? (
          <ErrorMsgContainer>
            <ThemedText.Error error fontWeight={400}>
              {`Incognito collects a small network fee of ${networkFeeText} to pay the miners who help power the network. Get
            some from the `}
              <a className="link" href="https://faucet.incognito.org/" target="_blank" rel="noreferrer">
                faucet
              </a>
            </ThemedText.Error>
          </ErrorMsgContainer>
        ) : !!errorMsg ? (
          <ErrorMsgContainer>
            <ThemedText.Error style={{ marginTop: '4px' }} error className={`error`}>
              {errorMsg}
            </ThemedText.Error>
          </ErrorMsgContainer>
        ) : null}
        {visibleAddress && (
          <Field
            component={InputField}
            name={FORM_CONFIGS.toAddress}
            inputType={INPUT_FIELD.address}
            // leftTitle="Address"
            componentProps={{
              placeholder:
                buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? 'Your Incognito Address' : 'Your External Address',
              disabled: formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO,
            }}
            validate={validateAddress}
            warning={warningAddress}
          />
        )}
        <EstReceive
          buyToken={buyToken}
          sellToken={sellToken}
          rate={rate}
          minReceiveAmount={formType === FormTypes.SWAP ? estReceiveAmount || '0' : inputAmount}
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
          inputAmount={inputAmount}
          impactAmount={exchangeSelectedData?.impactAmount}
        />
        <VerticalSpace />
        {button.isConnected ? (
          <ButtonConfirmed height={'50px'} type="submit">
            {button.text}
          </ButtonConfirmed>
        ) : (
          <ButtonConfirmed height={'50px'} onClick={_buttonAction}>
            {button.text}
          </ButtonConfirmed>
        )}
      </form>
    </Styled>
  );
});

FormUnshield.displayName = 'FormUnshield';

export default enhance(FormUnshield);
