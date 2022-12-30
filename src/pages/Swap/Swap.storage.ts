import uniqueBy from 'lodash/uniqBy';
import Storage from 'storage';

const KEY = 'INC-SWAP-EXCHANGE-TXS-1';

export interface ISwapTxStorage {
  txHash: string;
  incAddress?: string;
  time: number;
  appName: string;
  sellTokenID?: string; // If sellTokenID is undefine, it is Opeasea Tx
  buyTokenID: string;
  sellAmountText?: string;
  buyAmountText: string;
}

const getSwapTxs = (): ISwapTxStorage[] => {
  const swapTxs = Storage.getItem(KEY);
  if (!swapTxs) return [];
  return swapTxs;
};

const setSwapTx = ({
  txHash,
  incAddress,
  time,
  appName,
  sellAmountText,
  buyAmountText,
  sellTokenID,
  buyTokenID,
}: ISwapTxStorage) => {
  let swapTxs: ISwapTxStorage[] = Storage.getItem(KEY) || [];
  swapTxs.push({ txHash, incAddress, time, appName, sellAmountText, buyAmountText, sellTokenID, buyTokenID });
  swapTxs = uniqueBy(swapTxs, 'txHash');
  Storage.setItem(KEY, swapTxs);
};

export { getSwapTxs, setSwapTx };
