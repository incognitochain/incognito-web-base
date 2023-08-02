import { LoadingActionType } from './loading.types';

const setLoading = (payload: { flag: boolean; message?: string }) => ({
  type: LoadingActionType.SET_LOADING,
  payload,
});

export { setLoading };
