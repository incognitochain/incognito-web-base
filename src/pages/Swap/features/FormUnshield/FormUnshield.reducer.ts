import { isMainnet } from 'config';
import { SupportedChainId } from 'constants/chains';
import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { Reducer } from 'redux';

import { FormUnshieldActions, FormUnshieldActionType, IFormUnshieldState } from './FormUnshield.types';

const initialState: IFormUnshieldState = {
  sellToken: {
    identify: `${BIG_COINS.ETH_UNIFIED.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}`,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
    networkName: MAIN_NETWORK_NAME.INCOGNITO,
    chainID: isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN,
  },
  buyToken: {
    identify: `${BIG_COINS.ETH.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.ETH}`,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    chainID: isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN,
    networkName: MAIN_NETWORK_NAME.ETHEREUM,
  },

  networkFee: 100,
  networkFeeToken: PRV.identify,

  isFetchingFee: false,
  isUseBurnFeeLevel1: true,
  userFee: undefined,
};

export const reducer: Reducer<IFormUnshieldState, FormUnshieldActions & any> = (
  state = initialState,
  action: FormUnshieldActions
): IFormUnshieldState => {
  switch (action.type) {
    case FormUnshieldActionType.SET_TOKEN: {
      const { sellToken, buyToken } = action.payload;
      return {
        ...state,
        sellToken: sellToken ? sellToken : state.sellToken,
        buyToken: buyToken ? buyToken : state.buyToken,
      };
    }
    case FormUnshieldActionType.SET_USER_FEE: {
      const { fee } = action.payload;
      return {
        ...state,
        userFee: fee,
      };
    }
    case FormUnshieldActionType.FETCHING_FEE: {
      const { isFetchingFee } = action.payload;
      return {
        ...state,
        isFetchingFee,
      };
    }
    default:
      return state;
  }
};

export default reducer;
