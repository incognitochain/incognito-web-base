import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { Reducer } from 'redux';

import { FormUnshieldActions, FormUnshieldActionType, IFormUnshieldState } from './FormUnshield.types';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

const initialState: IFormUnshieldState = {
  sellToken: {
    parentIdentify: `${BIG_COINS.USDT_UNIFIED.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}`,
    identify: `${BIG_COINS.USDT_UNIFIED.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN}`,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN,
    networkName: MAIN_NETWORK_NAME.INCOGNITO,
    chainID: undefined,
  },
  buyToken: {
    parentIdentify: `${BIG_COINS.PRV.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.PRV}`,
    identify: `${BIG_COINS.PRV.tokenID}-${PRIVATE_TOKEN_CURRENCY_TYPE.PRV}`,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.PRV,
    chainID: undefined,
    networkName: MAIN_NETWORK_NAME.PRV,
  },
  networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
  networkFeeToken: PRV.identify,

  isFetchingFee: false,
  isUseBurnFeeLevel1: true,
  userFee: undefined,

  // swap data
  vaults: {},
  exchangeSelected: null,
  exchangeSupports: [],
  errorMsg: null,
  swapNetwork: MAIN_NETWORK_NAME.INCOGNITO,
  isMax: false,
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
      const { isFetchingFee, isResetForm } = action.payload;
      const isReset = isResetForm;
      return {
        ...state,
        isFetchingFee,

        // Reset unshield data when estimate trade
        isUseBurnFeeLevel1: isReset ? true : state.isUseBurnFeeLevel1,
        userFee: isReset ? undefined : state.userFee,

        // Reset swap data when estimate trade
        exchangeSelected: isReset ? null : state?.exchangeSelected,
        exchangeSupports: isReset ? [] : state?.exchangeSupports,
        errorMsg: isReset ? null : state?.errorMsg,
      };
    }
    case FormUnshieldActionType.RESET_FEE: {
      return {
        ...state,
        isUseBurnFeeLevel1: true,
        userFee: undefined,
        exchangeSelected: null,
        exchangeSupports: [],
        errorMsg: null,
      };
    }
    case FormUnshieldActionType.SET_VAULTS: {
      const vaults = action.payload;
      return {
        ...state,
        vaults,
      };
    }
    case FormUnshieldActionType.SET_SWAP_EXCHANGE_SUPPORT: {
      const exchangeSupports = action.payload;
      return {
        ...state,
        exchangeSupports,
      };
    }
    case FormUnshieldActionType.SET_SWAP_EXCHANGE_SELECTED: {
      const exchangeSelected = action.payload;
      return {
        ...state,
        exchangeSelected,
      };
    }
    case FormUnshieldActionType.SET_ERROR_MSG: {
      const errorMsg = action.payload;
      return {
        ...state,
        errorMsg,
      };
    }
    case FormUnshieldActionType.SET_SWAP_NETWORK: {
      const swapNetwork = action.payload;
      return {
        ...state,
        swapNetwork,
      };
    }
    case FormUnshieldActionType.FREE_SWAP_FORM: {
      return {
        ...initialState,
      };
    }
    case FormUnshieldActionType.SET_IS_MAX: {
      const isMax = action.payload;
      return {
        ...state,
        isMax,
      };
    }
    default:
      return state;
  }
};

export default reducer;
