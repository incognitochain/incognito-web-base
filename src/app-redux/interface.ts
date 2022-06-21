import { IExampleReducer } from '@modules/Example';
import { IApplicationReducer } from '@src/app-redux/state/application';
import { IUserReducer } from '@src/app-redux/state/user';
import { IWalletReducer } from '@src/app-redux/state/wallet';
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
  application: IApplicationReducer;
}
