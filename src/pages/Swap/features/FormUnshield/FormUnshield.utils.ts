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

import { IFormUnshieldState } from './FormUnshield.types';

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

  maxAmountNoClip?: string;
  maxAmountText?: string;
  maxAmountFormatedText: string;

  inputAmount: string;
  inputOriginalAmount: string;
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
  const { sellToken, buyToken } = unshield;
  const { networkName: sellNetworkName, identify: sellIdentify, currency: sellCurrency } = sellToken;
  const { currency: buyCurrency, networkName: buyNetworkName } = buyToken;

  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  const inputAmount = formSelector(state, FORM_CONFIGS.sellAmount);
  const inputAddress = formSelector(state, FORM_CONFIGS.toAddress);

  // sell token
  const _sellToken = getDataByTokenID(sellIdentify);
  const _sellTokenList = unshieldableTokens(state);

  // buy token
  const _buyToken = getDataByTokenID(_sellToken.parentTokenID);
  const _buyNetworkList = _buyToken.supportedNetwork;

  const isExternalAddress = isEtherAddress(inputAddress);

  // amount validator
  const inputOriginalAmount =
    convert.toOriginalAmount({
      decimals: _sellToken.pDecimals,
      humanAmount: inputAmount,
      round: false,
    }) || 0;
  const maxAmountNoClip = _sellToken.formatAmountNoClip;
  const maxAmountText = _sellToken.formatAmount;
  const maxAmountFormatedText = `${_sellToken.formatAmount || 0} ${_sellToken.symbol}`;

  const incAccount = incognitoWalletAccountSelector(state);
  const nativeToken = getDataByTokenID(PRV.identify);
  let incAddress = '';
  if (incAccount) {
    incAddress = incAccount.paymentAddress;
    // let maxAmount: number = new BigNumber(sendTokenAmount)
    //   .minus(sellToken.toke === networkFeeTokenID ? networkFee : 0)
    //   .toNumber();
  }

  const disabledForm =
    !valid || submitting || !isExternalAddress || new BigNumber(inputOriginalAmount).lte(0) || !incAccount;

  return {
    sellToken: _sellToken,
    sellTokenList: _sellTokenList,

    buyToken: _buyToken,
    buyNetworkList: _buyNetworkList,
    buyCurrency,
    buyNetworkName,

    maxAmountNoClip,
    maxAmountText,
    maxAmountFormatedText,

    isExternalAddress,
    unshieldAddress: inputAddress,
    incAddress,

    disabledForm,

    inputAmount,
    inputOriginalAmount: inputOriginalAmount.toString(),
  };
};

export { getUnshieldData };
