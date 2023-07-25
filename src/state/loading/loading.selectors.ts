import { RootState } from 'state/index';

export const getLoading = (state: RootState): boolean => state.loadingReducer.isLoading;

export const getMessage = (state: RootState): string | undefined => state.loadingReducer.message;
