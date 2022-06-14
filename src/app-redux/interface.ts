import { IThemeState } from '@src/theme';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  theme: IThemeState;
}
