export enum LoadingActionType {
  SET_LOADING = 'LOADING/SET_LOADING',
}

export interface LoadingReducer {
  isLoading: boolean;
  message?: string;
}
