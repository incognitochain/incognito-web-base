import SwapIcon from 'assets/svg/swap.svg';
import { Space } from 'components/Core';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import SelectionField from 'components/Core/ReduxForm/SelectionField';
import { TAB_LIST } from 'components/Core/Tabs';
import { changeTab } from 'components/Core/Tabs/Tabs.reducer';
import { MAIN_NETWORK_NAME, PRV } from 'constants/token';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Field } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { getPrivacyDataByTokenIDSelector, unshieldableTokens } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { EstReceive } from '../EstReceive';
import { getTradePath } from '../EstReceive/EstReceive';
import { actionSetToken } from '../FormDeposit/FormDeposit.actions';
import { actionSetExchangeSelected } from './FormUnshield.actions';
import enhance, { IMergeProps } from './FormUnshield.enhance';
import { FormTypes, NetworkTypePayload, SwapExchange } from './FormUnshield.types';

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
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 4px solid #303030;
    background-color: #252525;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 46.5%;
    top: -20px;
  }
  .disable {
    opacity: 0.6;
    cursor: unset;
  }
  .swap-icon {
    cursor: pointer;
    :hover {
      background-color: #404040;
      transition: 0.3s all ease-in-out;
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
  border: 1px solid ${({ theme }) => theme.content4};
  border-radius: 8px;
  margin-top: 4px;
  div {
    margin-top: 0 !important;
  }
`;

const InterSwapMsg = styled.div`
  padding: 12px 0;
  //background-color: ${({ theme }) => theme.primary14};
  border-radius: 8px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  div {
    margin-top: 0 !important;
    color: ${({ theme }) => theme.text1};
    width: fit-content;
    line-height: 140%;
    opacity: 0.9;
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
    buyNetworkName,
    userBalanceFormatedText,
    button,
    inputAmount,
    networkFeeText,
    enoughNetworkFee,
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

  // const { isIncognitoInstalled } = useIncognitoWallet();
  const { showUnlockModal } = useUnlockWallet();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const history = useHistory();
  const tokens = useAppSelector(unshieldableTokens);

  const { showPopup } = useIncognitoWallet();
  const [changing, setChanging] = React.useState(false);
  const prvToken = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);

  // const _buttonAction = () => showPopup();
  const _buttonAction = () => showUnlockModal();
  const dispatch = useDispatch();

  const onSelectExchange = (exchangeName: any) => {
    dispatch(actionSetExchangeSelected(exchangeName));
  };

  const [visibleAddress, setVisibleAddress] = useState<boolean>(
    buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress
  );

  const onTopUpCoins = () => {
    let _sellToken = sellToken as any;
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
      const { isValid } = getQueryPAppName();
      if (isValid) {
        history.push('/deposit');
      } else {
        dispatch(changeTab({ tab: TAB_LIST.SWAP.tabNames[1], rootTab: TAB_LIST.SWAP.rootTab }));
      }
    }, 100);
  };

  const rightLabelAddress = visibleAddress ? '- Send to' : '+ Send to';

  const getTimeNumb = ({
    appName,
    isReShield,
    exchangeName,
    networkName,
  }: {
    appName: string;
    isReShield: boolean;
    exchangeName?: string;
    networkName?: string;
  }) => {
    let timeNumb = 0;
    if (appName === SwapExchange.PANCAKE_SWAP) {
      timeNumb = isReShield ? 2 : 1;
    } else if (
      appName === SwapExchange.CURVE ||
      (appName === SwapExchange.UNISWAP &&
        ((exchangeName && exchangeName.includes(MAIN_NETWORK_NAME.POLYGON)) ||
          (networkName && networkName.includes(NetworkTypePayload.POLYGON))))
    ) {
      timeNumb = isReShield ? 6 : 1;
    } else {
      timeNumb = isReShield ? 5 : 1;
    }
    return timeNumb;
  };

  const getEstimateTime = () => {
    let time = 0;
    let timeStr = '';
    let desc = '';
    if (formType === FormTypes.UNSHIELD) {
      time = fee.extraFee ? 6 : 1;
      if (fee.extraFee) {
        desc = "Due to unified tokens' nature, the unshielding could take up to 6 hours.";
      }
    } else if (exchangeSelectedData?.appName) {
      const isReShield = buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO;
      if (exchangeSelectedData?.interSwapData?.midOTA) {
        const { pAppName, pAppNetwork } = exchangeSelectedData?.interSwapData;
        time = 1 + getTimeNumb({ appName: pAppName, networkName: pAppNetwork, isReShield });
      } else {
        const { appName, exchangeName } = exchangeSelectedData;
        time = getTimeNumb({ appName, exchangeName, isReShield });
      }
    }
    if (time === 0) {
      timeStr = '';
    } else if (time === 1) {
      timeStr = `${time} min`;
    } else {
      timeStr = `${time} mins`;
    }
    return {
      timeStr,
      desc,
    };
  };

  const { timeStr, desc } = getEstimateTime();

  const renderInterSwapMsg = () => {
    const { interSwapData } = exchangeSelectedData;
    if (!interSwapData || !interSwapData.midToken || interSwapData.path.length < 2) return null;
    const path1 = interSwapData?.path[0];
    const path2 = interSwapData?.path[1];
    return (
      <ThemedText.SmallLabel>
        The swap is performed among liquidity pools (
        {typeof path1.tradePath === 'string' ? path1.tradePath : getTradePath(path1.tradePath, tokens)}
        {` `}
        with {path1.exchangeName} then{' '}
        {typeof path2.tradePath === 'string' ? path2.tradePath : getTradePath(path2.tradePath, tokens)} with{' '}
        {path2.exchangeName}).
        <br />
        USDT will be returned to your wallet if the swap fails for any reason.
        {/*<Tooltip*/}
        {/*  overlayInnerStyle={{ width: '300px', borderRadius: 8 }}*/}
        {/*  title={*/}
        {/*    <p>*/}
        {/*      For example: Users can swap ETH ={'>'} XRM via USDT:*/}
        {/*      <br /> &#8226; pUniswap: ETH ={'>'} USDT*/}
        {/*      <br /> &#8226; pDEX: USDT ={'>'} XMR*/}
        {/*    </p>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Info style={{ marginLeft: 4, position: 'absolute', cursor: 'pointer' }} />*/}
        {/*</Tooltip>*/}
      </ThemedText.SmallLabel>
    );
  };

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
        <Space.Vertical size={16} />
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
          footerRightClass="max-text"
          componentProps={{
            type: 'number',
          }}
          validate={validateAmount}
          showShowTopUp={true}
          onTopUp={onTopUpCoins}
          tokenAmountNum={sellToken.amount}
          tokenType={'sellToken'}
          footerRightText="Max"
          onClickFooterRight={onClickMax}
        />
        <div style={{ height: 2 }} />
        <WrapSwapIcon>
          <div
            className={`${formType === FormTypes.SWAP ? 'swap-icon' : 'disable'} icon`}
            style={{ animation: changing ? `spin ${0.6}s linear` : '', width: 40, height: 40 }}
            onClick={() => {
              if (formType === FormTypes.SWAP && !changing) {
                onRotateSwapToken();
                setChanging(true);
                setTimeout(() => setChanging(false), 1000);
              }
            }}
          >
            <img style={{ width: 16, height: 16 }} src={SwapIcon} alt="swap-svg" />
          </div>
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
          // footerRightText={rightLabelAddress}
          isUseInput={false}
          footerRightClass="send-to-text"
          tokenNetwork={buyToken.network}
          onClickFooterRight={() => setVisibleAddress((value) => !value)}
          componentProps={{
            type: 'number',
            disabled: true,
          }}
          tokenType={'buyToken'}
        />
        {(!prvToken.amount || !enoughNetworkFee) && !!inputAmount && incAccount ? (
          <ErrorMsgContainer>
            <ThemedText.Error error fontWeight={400}>
              {`Incognito collects a small network fee of ${networkFeeText} to pay the miners who help power the network.`}
              {/*  {`Incognito collects a small network fee of ${networkFeeText} to pay the miners who help power the network. Get*/}
              {/*some from the `}*/}
              {/*  <a className="link" href="https://faucet.incognito.org/" target="_blank" rel="noreferrer">*/}
              {/*    faucet*/}
              {/*  </a>*/}
            </ThemedText.Error>
          </ErrorMsgContainer>
        ) : !!errorMsg ? (
          <ErrorMsgContainer>
            <ThemedText.Error style={{ marginTop: '4px' }} error className={`error`}>
              {errorMsg}
            </ThemedText.Error>
          </ErrorMsgContainer>
        ) : exchangeSelectedData?.interSwapData?.midToken ? (
          <InterSwapMsg>
            <ThemedText.SmallLabel>{renderInterSwapMsg()}</ThemedText.SmallLabel>
          </InterSwapMsg>
        ) : null}
        {visibleAddress && (
          <Field
            component={InputField}
            name={FORM_CONFIGS.toAddress}
            inputType={INPUT_FIELD.address}
            // leftTitle="Address"
            componentProps={{
              placeholder:
                buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? 'Your Incognito Address' : 'Recipient Address',
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
          minReceiveAmount={formType === FormTypes.SWAP ? `${estReceiveAmount || '0'}` : inputAmount}
          networkFee={networkFeeText}
          burnFeeText={burnFeeText}
          time={timeStr}
          desc={desc}
          exchanges={exchangeSupports}
          exchangeSelected={exchangeSelected}
          onSelectExchange={onSelectExchange}
          formType={formType}
          tradePath={tradePath}
          swapFee={swapFee}
          isFetchingFee={isFetching}
          inputAmount={inputAmount}
          impactAmount={exchangeSelectedData?.impactAmount || undefined}
          errorMsg={errorMsg || undefined}
          interPath={exchangeSelectedData?.interSwapData?.path}
        />
        <Space.Vertical size={16} />
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
