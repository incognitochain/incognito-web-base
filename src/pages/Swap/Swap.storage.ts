import Storage from 'storage';

const KEY = 'INC-SWAP-EXCHANGE-TXS';

export interface ISwapTxStorage {
  txHash: string;
  incAddress: string;
}

const getSwapTxs = (): ISwapTxStorage[] => {
  const swapTxs = Storage.getItem(KEY);
  if (!swapTxs) return [];
  return swapTxs;
};

const setSwapTx = ({ txHash, incAddress }: ISwapTxStorage) => {
  const swapTxs: ISwapTxStorage[] = Storage.getItem(KEY) || [];
  swapTxs.push({ txHash, incAddress });
  Storage.setItem(KEY, swapTxs);
};

export { getSwapTxs, setSwapTx };
