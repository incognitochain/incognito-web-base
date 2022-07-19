import { BigNumber } from 'bignumber.js';
import { MAIN_NETWORK_NAME, PRV } from 'constants/token';
import { isAddress as isEtherAddress } from 'ethers/lib/utils';
import { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { unshieldableTokens } from 'state/token';
import convert from 'utils/convert';
import format from 'utils/format';

import { IFormUnshieldState } from './FormUnshield.types';

export interface IFee {
  networkFee: number;
  networkFeeToken: string;
  burnFee?: string;
  burnFeeToken?: string;
  feeAddress?: string;
  isUseTokenFee?: boolean;
  id?: number;
  estimatedBurnAmount: number;
  estimatedExpectedAmount: number;
}

export interface IUnshieldData {
  unshieldAddress: string;
  incAddress: string;

  sellToken: SelectedPrivacy;
  sellTokenList: SelectedPrivacy[];

  buyToken: SelectedPrivacy;
  buyNetworkList: ITokenNetwork[] | undefined;
  buyCurrency: number;
  buyNetworkName: MAIN_NETWORK_NAME;

  isExternalAddress: boolean;
  disabledForm: boolean;

  userAmountNoClip?: string;
  userAmount?: string;
  userAmountFormatedText: string;

  minAmountText: string;
  maxAmountText: string;

  inputAmount: string;
  inputOriginalAmount: string;
  inputAddress: string;

  fee: IFee;

  isFetching: boolean;
  networkFeeText: string;
  burnFeeText: string;
}

const getUnshieldData = ({
  unshield,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  unshield: IFormUnshieldState;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy;
  state: AppState;
}): IUnshieldData => {
  const { sellToken, buyToken, userFee, networkFee, isFetchingFee, networkFeeToken, isUseBurnFeeLevel1 } = unshield;
  const _networkFee = networkFee;
  const { identify: sellIdentify } = sellToken;
  const { currency: buyCurrency, networkName: buyNetworkName, identify: buyIdentify } = buyToken;

  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  const inputAmount = formSelector(state, FORM_CONFIGS.sellAmount);
  const inputAddress = formSelector(state, FORM_CONFIGS.toAddress);

  // sell token
  const _sellToken = getDataByTokenID(sellIdentify);
  const _sellTokenList = unshieldableTokens(state);

  // buy token
  const _buyToken = getDepositTokenData(buyIdentify);
  const _buyParentToken = getDataByTokenID(_sellToken.parentTokenID);
  const _buyNetworkList = _buyParentToken.supportedNetwork;

  const isExternalAddress = isEtherAddress(inputAddress);

  // amount validator
  const inputOriginalAmount =
    convert.toOriginalAmount({
      decimals: _sellToken.pDecimals,
      humanAmount: new BigNumber(inputAmount || 0).plus(userFee ? userFee.estimateFee || 0 : 0).toString(),
      round: false,
    }) || 0;
  const userAmountNoClip = _sellToken.formatAmountNoClip;
  const userAmount = _sellToken.formatAmount;
  const userAmountFormatedText = `${_sellToken.formatAmount || 0} ${_sellToken.symbol}`;

  const incAccount = incognitoWalletAccountSelector(state);
  const nativeToken = getDataByTokenID(PRV.identify);
  const incAddress = incAccount ? incAccount.paymentAddress : '';

  const enoughNetworkFee = new BigNumber(nativeToken.amount || 0).isGreaterThanOrEqualTo(_networkFee);
  let maxAmountText = '';
  let minAmountText = '';

  let combineFee: IFee = {
    networkFee: _networkFee,
    networkFeeToken: PRV.id,
    estimatedBurnAmount: 0,
    estimatedExpectedAmount: 0,
  };

  let burnFeeTokenIdentify = '';
  if (userFee) {
    const { fee, isUseTokenFee, id, feeAddress, estimatedBurnAmount, estimatedExpectedAmount, estimateFee } = userFee;
    const burnFee = isUseBurnFeeLevel1 ? fee.level1 : fee.level2;
    burnFeeTokenIdentify = isUseTokenFee ? _sellToken.identify : PRV.identify;
    const burnFeeToken = isUseTokenFee ? _sellToken.tokenID : PRV.id;

    // if (_sellToken.identify === burnFeeTokenIdentify) {
    //   burnFee = new BigNumber(burnFee || 0).plus(estimateFee || 0).toString();
    // } else {
    //   _networkFee += estimateFee;
    // }

    combineFee = {
      networkFee: _networkFee,
      networkFeeToken: PRV.id,
      burnFee,
      burnFeeToken,
      feeAddress,
      isUseTokenFee,
      id,
      estimatedBurnAmount,
      estimatedExpectedAmount,
    };

    const minAmount: number = new BigNumber(_sellToken.identify === networkFeeToken ? 1 + _networkFee : 1)
      .plus(_sellToken.identify === burnFeeTokenIdentify ? burnFee : 0)
      .toNumber();

    let maxAmount: number = new BigNumber(_sellToken.amount || 0)
      .minus(isUseTokenFee ? 0 : _networkFee)
      .minus(_sellToken.identify === burnFeeTokenIdentify ? burnFee : 0)
      .minus(estimateFee)
      .toNumber();

    if (maxAmount <= 0) {
      maxAmount = 0;
    }

    maxAmountText = convert
      .toHumanAmount({
        originalAmount: maxAmount,
        decimals: _sellToken.pDecimals,
      })
      .toString();

    minAmountText = format.formatAmount({
      originalAmount: minAmount,
      decimals: _sellToken.pDecimals,
      clipAmount: false,
    });
  }

  const disabledForm =
    !valid ||
    submitting ||
    !isExternalAddress ||
    new BigNumber(inputOriginalAmount).lte(0) ||
    !incAccount ||
    !_networkFee ||
    isFetchingFee ||
    !enoughNetworkFee;

  const networkFeeText = `${
    convert.toHumanAmountString({
      decimals: nativeToken.pDecimals,
      originalAmount: _networkFee,
    }) || 0
  } ${nativeToken.symbol}`;

  const burnFeeToken = getDataByTokenID(burnFeeTokenIdentify);
  let burnFeeText = '';
  if (burnFeeToken.symbol) {
    burnFeeText = `${convert.toHumanAmountString({
      originalAmount: Number(combineFee.burnFee || 0),
      decimals: burnFeeToken.pDecimals,
    })} ${burnFeeToken.symbol}`;
  }

  return {
    sellToken: _sellToken,
    sellTokenList: _sellTokenList,

    buyToken: _buyToken,
    buyNetworkList: _buyNetworkList,
    buyCurrency,
    buyNetworkName,

    userAmountNoClip,
    userAmount,
    userAmountFormatedText,
    minAmountText,
    maxAmountText,

    isExternalAddress,
    unshieldAddress: inputAddress,
    incAddress,

    disabledForm,

    inputAmount,
    inputOriginalAmount: inputOriginalAmount.toString(),

    fee: combineFee,
    inputAddress,
    isFetching: unshield.isFetchingFee,
    networkFeeText,
    burnFeeText,
  };
};

export { getUnshieldData };
