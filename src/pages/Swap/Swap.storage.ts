import uniqueBy from 'lodash/uniqBy';
import Storage from 'storage';

const KEY = 'INC-SWAP-EXCHANGE-TXS';

export interface ISwapTxStorage {
  txHash: string;
  incAddress: string;
  time: number;
  appName: string;
}

const getSwapTxs = (): ISwapTxStorage[] => {
  const swapTxs = Storage.getItem(KEY);
  if (!swapTxs) return [];
  return swapTxs;
};

const setSwapTx = ({ txHash, incAddress, time, appName }: ISwapTxStorage) => {
  let swapTxs: ISwapTxStorage[] = Storage.getItem(KEY) || [];
  swapTxs.push({ txHash, incAddress, time, appName });
  swapTxs = uniqueBy(swapTxs, 'txHash');
  Storage.setItem(KEY, swapTxs);
};

export { getSwapTxs, setSwapTx };
