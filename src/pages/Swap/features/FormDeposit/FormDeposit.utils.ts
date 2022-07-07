// const { isPaymentAddress } = require('incognito-chain-web-js/build/web/wallet');
import isEmpty from 'lodash/isEmpty';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';
import { groupNetworkSelectors } from 'state/token';

import { IFormDepositReducer } from './FormDeposit.types';
const { isPaymentAddress } = require('incognito-chain-web-js/build/web/wallet');

export interface IDepositData {
  sellTokenList: PToken[];
  sellNetworkList: ITokenNetwork[];
  sellToken: SelectedPrivacy;
  sellTokenParent: SelectedPrivacy;
  sellNetworkName: string;
  isIncognitoAddress: boolean;
  disabledForm: boolean;
}

const getDepositData = ({
  deposit,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  deposit: IFormDepositReducer;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy;
  state: AppState;
}): IDepositData => {
  const { sellToken, buyToken } = deposit;
  const { networkName: sellNetworkName, tokenID: sellTokenID } = sellToken;
  const groupNetwork = groupNetworkSelectors(state);

  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  // form selector
  const inputAmount = formSelector(state, FORM_CONFIGS.sellAmount);
  const inputAddress = formSelector(state, FORM_CONFIGS.toAddress);
  const isIncognitoAddress = isEmpty(inputAddress) ? false : isPaymentAddress(inputAddress);

  // Sell tokens
  const _sellTokenList = groupNetwork[sellNetworkName];
  const _sellToken = getDepositTokenData(sellToken.tokenID);
  const _sellTokenParent = getDataByTokenID(_sellToken.parentTokenID);
  const _sellNetworkList = _sellTokenParent.supportedNetwork;

  const disabledForm = !valid || submitting || !isIncognitoAddress;

  return {
    sellTokenList: _sellTokenList,
    sellNetworkList: _sellNetworkList || [],
    sellToken: _sellToken,
    sellTokenParent: _sellTokenParent,
    sellNetworkName,

    isIncognitoAddress,
    disabledForm,
  };
};

export { getDepositData };
