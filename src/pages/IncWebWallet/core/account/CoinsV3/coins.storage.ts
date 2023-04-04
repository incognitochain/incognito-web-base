import { Coins } from '../../coins';
import { Method } from '../../object';
import { TokenID } from '../../token';

export const PRVIDSTR = '0000000000000000000000000000000000000000000000000000000000000004';
export const PTOKEN_ID = '0000000000000000000000000000000000000000000000000000000000000005';

export type CoinsScanResult = {
  [PRVIDSTR]: {
    missingBatchIDs: any;
    latestBatchID: number;
    latestIndex: number;
    unspentCoins: Coins[];
  };
  [PTOKEN_ID]: {
    missingBatchIDs: any;
    latestBatchID: number;
    latestIndex: number;
    unspentCoins: Coins[];
  };
  tokenList: TokenID[];
  finishScan: boolean;
};

//Specific Action
interface CoinsV3Storage extends Method {
  getStorageCoinsScan(): Promise<CoinsScanResult>;
  getStorageCoinsScanKey(): string; //KEY = `${otaKey}${fullNode}VERSION_3:(COINS_SCAN)`
  getStorageHardwareAccountIndexKey(): string; //KEY = `${otaKey}${fullNode}VERSION_3:(HARDWARE_ACCOUNT_INDEX)`
  getStorageHardwareAccountIndex(): Promise<void> | Error;

  setStorageCoinsScan(parasm: CoinsScanResult): Promise<void> | Error;
  setStorageHardwareAccountIndex(index: number): Promise<void> | Error;
  setNewAccountCoinsScan(): Promise<void> | Error;
  clearStorageCoinsScan(): Promise<void> | Error;
}
export type { CoinsV3Storage };
