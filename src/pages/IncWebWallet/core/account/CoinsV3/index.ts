import { CoinsV3Storage } from './coins.storage';
import { CoinsV3UnspentCoins } from './coins.unspentCoins';

interface CoinsV3 extends CoinsV3Storage, CoinsV3UnspentCoins {}

export type { CoinsV3 };
