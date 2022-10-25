// import SwapIcon from 'assets/svg/swap.svg';
// import { ButtonConfirmed } from 'components/Core/Button';
// import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
// import { InputField } from 'components/Core/ReduxForm';
// import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
// import SelectionField from 'components/Core/ReduxForm/SelectionField';
// import { VerticalSpace } from 'components/Core/Space';
// <<<<<<< HEAD
// import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
// import { Selection } from 'pages/Swap/features/Selection';
// =======
// import { MAIN_NETWORK_NAME } from 'constants/token';
// >>>>>>> build/staging
// import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Field } from 'redux-form';
// import styled from 'styled-components/macro';
//
// import { ThemedText } from '../../../../theme';
// import { EstReceive } from '../EstReceive';
// import { actionSetExchangeSelected } from './FormUnshield.actions';
// <<<<<<< HEAD
// import { BLACKLIST_PRV, BLACKLIST_PRV_EVM } from './FormUnshield.constants';
// import enhance, { IMergeProps } from './FormUnshield.enhance';
// =======
// import enhance from './FormUnshield.enhance';
// >>>>>>> build/staging
// import { FormTypes, SwapExchange } from './FormUnshield.types';
//
// const Styled = styled.div`
//   .buy-section-style {
//     margin-top: -13px;
//   }
//   .max-text {
//     padding-left: 15px;
//     font-size: 18px;
//     :hover {
//       opacity: 0.8;
//     }
//     color: ${({ theme }) => theme.btn1};
//   }
//
//   .send-to-text {
//     padding-left: 15px;
//     :hover {
//       opacity: 0.8;
//     }
//   }
// `;
//
// const WrapSwapIcon = styled.div`
//   width: 100%;
//   height: 56px;
//   @keyframes spin {
//     from {
//       transform: rotate(0deg);
//     }
//     to {
//       transform: rotate(180deg);
//     }
//   }
//   .icon {
//     margin-top: 16px;
//     position: absolute;
//     left: 46.5%;
//     :hover {
//       transform: scale(1.2);
//     }
//   }
//   .disable {
//     opacity: 0.5;
//     cursor: unset;
//   }
//   .swap-icon {
//     cursor: pointer;
//     :hover {
//       transform: scale(1.2);
//       transition-duration: 0.3s;
//       opacity: 0.8;
//     }
//     :active {
//       opacity: 0.5;
//     }
//   }
// `;
//
// const FormUnshield = React.memo((props: any) => {
//   const {
//     handleSubmit,
//     sellToken,
//     sellTokenList,
//     buyParentToken,
//     buyToken,
//     buyTokenList,
//     buyNetworkList,
//     buyCurrency,
//     buyNetworkName,
//     userBalanceFormatedText,
//     button,
//     inputAmount,
//     networkFeeText,
//     burnFeeText,
//
//     validateAddress,
//     warningAddress,
//     onSelectSellToken,
//     onSelectBuyToken,
//     onSelectBuyNetwork,
//     onRotateSwapToken,
//     validateAmount,
//     onClickMax,
//     onSend,
//
//     fee,
//     formType,
//     exchangeSelected,
//     estReceiveAmount,
//     expectedReceiveAmount,
//     exchangeSupports,
//     tradePath,
//     errorMsg,
//     swapFee,
//     isFetching,
//     exchangeSelectedData,
//     inputAddress,
//
//     userBuyBalanceFormatedText,
//     rate,
//
//     sellParentToken,
//   } = props;
//
//   const { showPopup } = useIncognitoWallet();
//   const [changing, setChanging] = React.useState(false);
//
//   const _buttonAction = () => showPopup();
//
//   const dispatch = useDispatch();
//
//   const onSelectExchange = (exchangeName: any) => {
//     dispatch(actionSetExchangeSelected(exchangeName));
//   };
//
// <<<<<<< HEAD
//   const getBlackListBuyTokens = () => {
//     if (buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO) {
//       return sellToken.tokenID === PRV.id ? BLACKLIST_PRV : BLACKLIST_PRV_EVM;
//     }
//     return [];
//   };
// =======
//   const [visibleAddress, setVisibleAddress] = useState<boolean>(
//     buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress
//   );
//
//   useEffect(() => {
//     if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO && !inputAddress) {
//       setVisibleAddress(true);
//     } else {
//       setVisibleAddress(false);
//     }
//   }, [sellToken.tokenID, buyToken.tokenID, buyNetworkName]);
//
//   const rightLabelAddress = visibleAddress ? '- Send to' : '+ Send to';
// >>>>>>> build/staging
//
//   const getEstimateTime = () => {
//     let time = '';
//     let desc = '';
//     if (formType === FormTypes.UNSHIELD) {
//       time = fee.extraFee ? '6 hours' : '1 min';
//       if (fee.extraFee) {
//         desc = "Due to unified tokens' nature, the unshielding could take up to 6 hours.";
//       }
//     } else if (exchangeSelectedData?.appName) {
//       const isReShield = buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO;
//       const { appName, exchangeName } = exchangeSelectedData;
//       if (appName === SwapExchange.PANCAKE_SWAP) {
//         time = isReShield ? '2 mins' : '1 min';
//       } else if (
//         appName === SwapExchange.CURVE ||
//         (appName === SwapExchange.UNISWAP && exchangeName.includes(MAIN_NETWORK_NAME.POLYGON))
//       ) {
//         time = isReShield ? '6 mins' : '1 min';
//       } else {
//         time = isReShield ? '5 mins' : '1 min';
//       }
//     }
//     return { time, desc };
//   };
//
//   const { time, desc } = getEstimateTime();
//
//   React.useEffect(() => {
//     if (buyNetworkName !== MAIN_NETWORK_NAME.INCOGNITO) {
//       setVisibleAddress(true);
//     }
//   }, [buyNetworkName]);
//
//   return (
//     <Styled>
//       <form onSubmit={handleSubmit(onSend)}>
//         <VerticalSpace />
//         <Field
//           component={SelectionField}
//           name={FORM_CONFIGS.sellAmount}
//           inputType={INPUT_FIELD.amount}
//           headerTitle="From"
//           tokens={sellTokenList}
//           tokenSymbol={sellToken.symbol}
//           tokenImgUrl={sellToken.iconUrl}
//           onSelectToken={onSelectSellToken}
// <<<<<<< HEAD
//           blacklist={BLACKLIST_PRV_EVM}
//           showNetwork={true}
//         />
//         <VerticalSpace />
//         <Selection
//           title="To"
//           leftPlaceholder="Select token"
//           rightPlaceholder="Select network"
//           leftValue={buyParentToken.symbol}
//           tokens={buyTokenList}
//           iconUrl={buyParentToken.iconUrl}
//           networks={buyNetworkList}
//           currency={buyCurrency}
//           rightValue={buyNetworkName}
//           onSelectToken={onSelectBuyToken}
//           onSelectNetwork={onSelectBuyNetwork}
//           blacklist={getBlackListBuyTokens()}
//           showNetwork={true}
//         />
//         <VerticalSpace />
//         <Field
//           component={InputField}
//           name={FORM_CONFIGS.toAddress}
//           inputType={INPUT_FIELD.address}
//           leftTitle="Address"
// =======
//           networkName={MAIN_NETWORK_NAME.INCOGNITO}
//           amount={userBalanceFormatedText}
//           onClickFooterRight={onClickMax}
//           footerRightClass="max-text"
// >>>>>>> build/staging
//           componentProps={{
//             type: 'number',
//           }}
//           validate={validateAmount}
//           footerRightText="Max"
//         />
//         <WrapSwapIcon>
//           <img
//             className={`${formType === FormTypes.SWAP ? 'swap-icon' : 'disable'} icon`}
//             style={{ animation: changing ? `spin ${0.6}s linear` : '', width: 48, height: 48 }}
//             onClick={() => {
//               if (formType === FormTypes.SWAP) {
//                 onRotateSwapToken();
//                 setChanging(true);
//                 setTimeout(() => setChanging(false), 800);
//               }
//             }}
//             src={SwapIcon}
//             alt="swap-svg"
//           />
//         </WrapSwapIcon>
//         <Field
//           component={SelectionField}
//           name={FORM_CONFIGS.buyAmount}
//           inputType={INPUT_FIELD.amount}
//           className="buy-section-style"
//           headerTitle="To"
//           tokens={buyTokenList}
//           tokenSymbol={buyParentToken.symbol}
//           tokenImgUrl={buyParentToken.iconUrl}
//           networks={buyNetworkList}
//           networkName={buyNetworkName}
//           amount={userBuyBalanceFormatedText}
//           onSelectToken={onSelectBuyToken}
//           onSelectNetwork={onSelectBuyNetwork}
//           receiveValue={formType === FormTypes.SWAP ? expectedReceiveAmount || '0' : inputAmount}
//           footerRightText={rightLabelAddress}
//           isUseInput={false}
//           footerRightClass="send-to-text"
//           onClickFooterRight={() => setVisibleAddress((value) => !value)}
//           componentProps={{
//             type: 'number',
//             disabled: true,
//           }}
//         />
//         {!!errorMsg && (
//           <>
//             <ThemedText.Error style={{ marginTop: '4px' }} error className={`error`}>
//               {errorMsg}
//             </ThemedText.Error>
//             <VerticalSpace />
//           </>
//         )}
//         <VerticalSpace />
//         {visibleAddress && (
//           <>
//             <Field
//               component={InputField}
//               name={FORM_CONFIGS.toAddress}
//               inputType={INPUT_FIELD.address}
//               leftTitle="Address"
//               componentProps={{
//                 placeholder:
//                   buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO ? 'Your Incognito Address' : 'Your External Address',
//                 disabled: formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO,
//               }}
//               validate={validateAddress}
//               warning={warningAddress}
//             />
//             <VerticalSpace />
//           </>
//         )}
//         <EstReceive
// <<<<<<< HEAD
//           amountText={
//             formType === FormTypes.SWAP || (formType === FormTypes.UNSHIELD && sellToken.isBTC)
//               ? estReceiveAmount?.toString()
//               : inputAmount
//           }
//           symbol={buyToken.symbol || ''}
// =======
//           buyToken={buyToken}
//           sellToken={sellToken}
//           rate={rate}
//           minReceiveAmount={formType === FormTypes.SWAP ? estReceiveAmount || '0' : inputAmount}
// >>>>>>> build/staging
//           networkFee={networkFeeText}
//           burnFeeText={burnFeeText}
//           time={time}
//           desc={desc}
//           exchanges={exchangeSupports}
//           exchangeSelected={exchangeSelected}
//           onSelectExchange={onSelectExchange}
//           formType={formType}
//           tradePath={tradePath}
//           swapFee={swapFee}
//           isFetchingFee={isFetching}
//           inputAmount={inputAmount}
//         />
//         {/*<VerticalSpace />*/}
//         {button.isConnected ? (
//           <ButtonConfirmed type="submit">{button.text}</ButtonConfirmed>
//         ) : (
//           <ButtonConfirmed onClick={_buttonAction}>{button.text}</ButtonConfirmed>
//         )}
//       </form>
//     </Styled>
//   );
// });
//
// FormUnshield.displayName = 'FormUnshield';
//
// export default enhance(FormUnshield);

import SwapIcon from 'assets/svg/swap.svg';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import SelectionField from 'components/Core/ReduxForm/SelectionField';
import { VerticalSpace } from 'components/Core/Space';
import { MAIN_NETWORK_NAME, PRV } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { useAppSelector } from '../../../../state/hooks';
import { getPrivacyDataByTokenIDSelector } from '../../../../state/token';
import { ThemedText } from '../../../../theme';
import { EstReceive } from '../EstReceive';
import { actionSetExchangeSelected } from './FormUnshield.actions';
import enhance from './FormUnshield.enhance';
import { FormTypes, SwapExchange } from './FormUnshield.types';

const Styled = styled.div`
  .buy-section-style {
    margin-top: -13px;
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
  height: 56px;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
  .icon {
    margin-top: 16px;
    position: absolute;
    left: 46.5%;
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
        <Field
          component={SelectionField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          headerTitle="From"
          tokens={sellTokenList}
          tokenSymbol={sellToken.symbol}
          tokenImgUrl={sellToken.iconUrl}
          onSelectToken={onSelectSellToken}
          networkName={MAIN_NETWORK_NAME.INCOGNITO}
          amount={userBalanceFormatedText}
          onClickFooterRight={onClickMax}
          footerRightClass="max-text"
          componentProps={{
            type: 'number',
          }}
          validate={validateAmount}
          footerRightText="Max"
        />
        <WrapSwapIcon>
          <img
            className={`${formType === FormTypes.SWAP ? 'swap-icon' : 'disable'} icon`}
            style={{ animation: changing ? `spin ${0.6}s linear` : '', width: 48, height: 48 }}
            onClick={() => {
              if (formType === FormTypes.SWAP) {
                onRotateSwapToken();
                setChanging(true);
                setTimeout(() => setChanging(false), 800);
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
          headerTitle="To"
          tokens={buyTokenList}
          tokenSymbol={buyParentToken.symbol}
          tokenImgUrl={buyParentToken.iconUrl}
          networks={buyNetworkList}
          networkName={buyNetworkName}
          amount={userBuyBalanceFormatedText}
          onSelectToken={onSelectBuyToken}
          onSelectNetwork={onSelectBuyNetwork}
          receiveValue={formType === FormTypes.SWAP ? expectedReceiveAmount || '0' : inputAmount}
          footerRightText={rightLabelAddress}
          isUseInput={false}
          footerRightClass="send-to-text"
          onClickFooterRight={() => setVisibleAddress((value) => !value)}
          componentProps={{
            type: 'number',
            disabled: true,
          }}
        />
        {!prvToken.amount ? (
          <ThemedText.Error color="primary8" error fontWeight={400} marginTop="12px">
            {`Incognito collects a small network fee of ${networkFeeText} to pay the miners who help power the network. Get
            some from the `}
            <a className="link" href="https://faucet.incognito.org/" target="_blank" rel="noreferrer">
              faucet
            </a>
          </ThemedText.Error>
        ) : !!errorMsg ? (
          <>
            <ThemedText.Error style={{ marginTop: '4px' }} error className={`error`}>
              {errorMsg}
            </ThemedText.Error>
            <VerticalSpace />
          </>
        ) : null}
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
                disabled: formType === FormTypes.SWAP && buyNetworkName === MAIN_NETWORK_NAME.INCOGNITO,
              }}
              validate={validateAddress}
              warning={warningAddress}
            />
            <VerticalSpace />
          </>
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
        />
        {/*<VerticalSpace />*/}
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
