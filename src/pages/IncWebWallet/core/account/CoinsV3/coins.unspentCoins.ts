import { Coins } from '../../coins';
import { Method } from '../../object';
import { CoinsScanResult } from './coins.storage';

type UnspentCoins = Coins[];

interface CoinsV3UnspentCoins extends Method {
  loopGetUnspentCoinsV3(): Promise<CoinsScanResult> | Error;
  getUnspentCoinsV3(params: { tokenID: string; version: number; isNFT: boolean }): Promise<UnspentCoins> | Error;
}
export type { CoinsV3UnspentCoins };
