import { IUserReducer } from '@connections/state/user';
import { IWalletReducer } from '@connections/state/wallet/wallet.reducer';
import { IExampleReducer } from '@modules/Example';
import { IThemeReducer } from '@src/theme';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  theme: IThemeReducer;
  example: IExampleReducer;
  user: IUserReducer;
  wallet: IWalletReducer;
}
