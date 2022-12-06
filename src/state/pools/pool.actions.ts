import { getPools } from 'services/rpcClient';

import { AppDispatch, AppState } from '../index';
import { Pool, PoolActionType } from './pool.types';
import { parseListPoolApiResponse } from './pool.utils';

const actionSetPools = (payload: Pool[]) => ({
  type: PoolActionType.SET_POOLS,
  payload,
});

const actionFetchingPools = () => ({
  type: PoolActionType.FETCHING,
});

export const actionGetPools = () => async (dispatch: AppDispatch, getState: AppState & any) => {
  try {
    await dispatch(actionFetchingPools());
    const data = await getPools();
    let pools = parseListPoolApiResponse(data);
    pools.sort((a, b) => b.apy - a.apy);

    dispatch(actionSetPools(pools));
  } catch (e) {
    console.log('GET POOLS WITH ERROR: ', e);
  }
};
