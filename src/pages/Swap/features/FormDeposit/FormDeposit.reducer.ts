import { isMainnet } from 'config';
import { SupportedChainId } from 'constants/chains';
import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Reducer } from 'redux';

import { FormDepositActions, IFormDepositReducer } from './FormDeposit.types';

const initialState: IFormDepositReducer = {
  isFetching: false,
  sellToken: {
    // tokenID: BIG_COINS.ETH.tokenID,
    tokenID: 'c7545459764224a000a9b323850648acf271186238210ce474b505cd17cc93a0',
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    chainID: isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN,
    networkName: MAIN_NETWORK_NAME.ETHEREUM,
  },
  buyToken: {
    tokenID: BIG_COINS.ETH.tokenID,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    networkName: MAIN_NETWORK_NAME.INCOGNITO,
    chainID: 0,
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
