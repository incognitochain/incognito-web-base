import { UserActionType } from '@src/app-redux/state/user/user.constants';
import { IUserReducer, UserActions } from '@src/app-redux/state/user/user.types';
import { Reducer } from 'redux';

export const initialState: IUserReducer = {
  selectedWallet: undefined,
  selectedWalletBackfilled: false,
};

export const reducer: Reducer<IUserReducer, UserActions> = (
  state = initialState,
  action: UserActions,
) => {
  switch (action.type) {
    case UserActionType.UPDATE_SELECTED_WALLET: {
      const { wallet } = action.payload;
      return {
        ...state,
        selectedWallet: wallet,
        selectedWalletBackfilled: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
