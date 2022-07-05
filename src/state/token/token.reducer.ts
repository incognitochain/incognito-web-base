import { Reducer } from 'redux';
import { ITokenReducer, TokenActions, TokenActionType } from 'state/token/token.types';

const initialState: ITokenReducer = {
  isFetching: false,
  pTokens: {},
  depositable: {},
  groupByNetwork: {},
};

export const reducer: Reducer<ITokenReducer, TokenActions & any> = (
  state = initialState,
  action: TokenActions
): ITokenReducer => {
  switch (action.type) {
    case TokenActionType.SET_PTOKEN: {
      const { pTokens, depositable, groupByNetwork } = action.payload;
      return {
        ...state,
        pTokens,
        depositable,
        groupByNetwork,
      };
    }
    case TokenActionType.FETCHING: {
      const { isFetching } = action.payload;
      return {
        ...state,
        isFetching,
      };
    }
    default:
      return state;
  }
};

export default reducer;
