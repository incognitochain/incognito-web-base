import uniqueBy from 'lodash/uniqBy';
import { StorageManager } from 'storage';

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
  interPAppName: string;
  interPAppNetwork: string;
}

const getSwapTxs = (): ISwapTxStorage[] => {
  let swapTxs = StorageManager.getItem(KEY);
  if (!swapTxs) return [];
  if (typeof swapTxs === 'string') {
    swapTxs = JSON.parse(swapTxs);
  }
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
  interPAppName,
  interPAppNetwork,
}: ISwapTxStorage) => {
  let swapTxs: ISwapTxStorage[] = StorageManager.getItem(KEY) || [];
  if (typeof swapTxs === 'string') {
    swapTxs = JSON.parse(swapTxs);
  }
  swapTxs.push({
    txHash,
    incAddress,
    time,
    appName,
    sellAmountText,
    buyAmountText,
    sellTokenID,
    buyTokenID,
    interPAppName,
    interPAppNetwork,
  });
  swapTxs = uniqueBy(swapTxs, 'txHash');
  StorageManager.setItem(KEY, swapTxs);
};

export { getSwapTxs, setSwapTx };
