import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Reducer } from 'redux';

import { FormDepositActions, IFormDepositReducer } from './FormDeposit.types';

const initialState: IFormDepositReducer = {
  isFetching: false,
  sellToken: {
    tokenID: BIG_COINS.ETH.tokenID,
    currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    chainID: 1,
    networkName: MAIN_NETWORK_NAME.ETHEREUM,
  },
  buyToken: {
    tokenID: BIG_COINS.ETH.tokenID,
    currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    networkName: MAIN_NETWORK_NAME.INCOGNITO,
  },
};

export const reducer: Reducer<IFormDepositReducer, FormDepositActions & any> = (
  state = initialState,
  action: FormDepositActions
): IFormDepositReducer => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
