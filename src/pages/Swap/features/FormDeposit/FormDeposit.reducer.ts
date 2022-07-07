import { isMainnet } from 'config';
import { SupportedChainId } from 'constants/chains';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { Reducer } from 'redux';

import { FormDepositActions, FormDepositActionType, IFormDepositReducer } from './FormDeposit.types';

const initialState: IFormDepositReducer = {
  isFetching: false,
  sellToken: {
    // tokenID: BIG_COINS.ETH.tokenID,
    identify: `c7545459764224a000a9b323850648acf271186238210ce474b505cd17cc93a0-${PRIVATE_TOKEN_CURRENCY_TYPE.ERC20}`,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    chainID: isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN,
    networkName: MAIN_NETWORK_NAME.ETHEREUM,
  },
  buyToken: {
    identify: `c7545459764224a000a9b323850648acf271186238210ce474b505cd17cc93a0-${PRIVATE_TOKEN_CURRENCY_TYPE.ERC20}`,
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
    case FormDepositActionType.SET_TOKEN: {
      const { sellToken, buyToken } = action.payload;
      return {
        ...state,
        sellToken: sellToken ? sellToken : state.sellToken,
        buyToken: buyToken ? buyToken : state.buyToken,
      };
    }
    default:
      return state;
  }
};

export default reducer;
