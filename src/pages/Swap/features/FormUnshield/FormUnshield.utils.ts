import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { AppState } from 'state';

import { groupNetworkSelectors } from '../../../../state/token';
import { IFormUnshieldReducer } from './FormUnshield.types';

export interface IUnshieldData {
  unshieldAddress: string;
}

const getUnshieldData = ({
  unshield,
  getDataByTokenID,
  getDepositTokenData,
  state,
}: {
  unshield: IFormUnshieldReducer;
  getDataByTokenID: (tokenID: string) => SelectedPrivacy;
  getDepositTokenData: (tokenID: string) => SelectedPrivacy;
  state: AppState;
}): IUnshieldData => {
  const { sellToken, buyToken } = unshield;
  const { networkName: sellNetworkName, identify: sellIdentify, currency: sellCurrency } = sellToken;
  const { identify: buyIdentify } = buyToken;

  const formSelector = formValueSelector(FORM_CONFIGS.formName);
  const valid = isValid(FORM_CONFIGS.formName)(state);
  const submitting = isSubmitting(FORM_CONFIGS.formName)(state);

  const groupNetwork = groupNetworkSelectors(state);

  const _sellToken = getDataByTokenID(sellIdentify);
  const _sellTokenList = groupNetwork[sellNetworkName];
  const _sellNetworkList = _sellToken.supportedNetwork;

  console.log('SANG TEST::: ', _sellToken);
  return {
    unshieldAddress: '',
  };
};

export { getUnshieldData };
