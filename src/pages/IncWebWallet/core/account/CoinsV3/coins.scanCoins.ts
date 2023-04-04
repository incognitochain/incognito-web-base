import { Account } from '../..';
import { Method } from '../../object';
import { TokenID } from '../../token';
import { CoinsScanResult } from './coins.storage';

interface CoinsV3ScanCoins extends Method {
  scanCoins(parasm: { accountWallet: Account; tokenList: TokenID[] }): Promise<CoinsScanResult | Error>;
  loopStorageCoins(parasm: CoinsScanResult): Promise<void | Error>;
}
export type { CoinsV3ScanCoins };
