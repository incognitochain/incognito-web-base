import { PRV } from 'constants/token';
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

    const poolsArrayNoPRV = pools.filter((pool) => pool?.token1ID !== PRV.id && pool?.token2ID !== PRV.id);
    const poolsArrayHasPRV = pools.filter((pool) => pool?.token1ID === PRV.id || pool?.token2ID === PRV.id);

    const btcPrvPool = poolsArrayHasPRV.filter((pool) => pool?.token1Symbol === 'BTC' && pool?.token2Symbol === 'PRV');
    const ethPrvPool = poolsArrayHasPRV.filter((pool) => pool?.token1Symbol === 'ETH' && pool?.token2Symbol === 'PRV');
    const usdtPrvPool = poolsArrayHasPRV.filter(
      (pool) => pool?.token1Symbol === 'USDT' && pool?.token2Symbol === 'PRV'
    );
    const bnbPrvPool = poolsArrayHasPRV.filter((pool) => pool?.token1Symbol === 'BNB' && pool?.token2Symbol === 'PRV');

    const newPoolsArrayHasPRV = poolsArrayHasPRV?.filter(
      (pool) =>
        (pool?.token1Symbol !== 'BTC' || pool?.token2Symbol !== 'PRV') &&
        (pool?.token1Symbol !== 'ETH' || pool?.token2Symbol !== 'PRV') &&
        (pool?.token1Symbol !== 'BNB' || pool?.token2Symbol !== 'PRV') &&
        (pool?.token1Symbol !== 'USDT' || pool?.token2Symbol !== 'PRV')
    );

    let newPools: any = [
      ...btcPrvPool,
      ...ethPrvPool,
      ...usdtPrvPool,
      ...bnbPrvPool,
      ...newPoolsArrayHasPRV,
      ...poolsArrayNoPRV,
    ];

    dispatch(actionSetPools(newPools));
  } catch (e) {
    console.log('GET POOLS WITH ERROR: ', e);
  }
};
