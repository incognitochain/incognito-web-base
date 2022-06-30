import { Reducer } from 'redux';
import { ITokenReducer, TokenActions, TokenActionType } from 'state/token/token.types';

const initialState: ITokenReducer = {
  pTokens: {},
};

export const reducer: Reducer<ITokenReducer, TokenActions & any> = (
  state = initialState,
  action: TokenActions
): ITokenReducer => {
  switch (action.type) {
    case TokenActionType.SET_PTOKEN: {
      const { pTokens } = action.payload;
      return {
        ...state,
        pTokens,
      };
    }
    default:
      return state;
  }
};

export default reducer;
