import ethereumLogoUrl from 'assets/images/ethereum-logo.svg';
import ftmLogoUrl from 'assets/images/ftm_logo.svg';
import incognitoLogoUrl from 'assets/images/inc_logo.svg';
import bnbChainLogo from 'assets/svg/bnbchain-logo.svg';
import btcLogoUrl from 'assets/svg/btc-logo.svg';
import dashLogoUrl from 'assets/svg/dash-logo.svg';
import dogeLogoUrl from 'assets/svg/doge-logo.svg';
import dotLogoUrl from 'assets/svg/dot-logo.svg';
import ltcLogoUrl from 'assets/svg/ltc-logo.svg';
import neoLogoUrl from 'assets/svg/neo-logo.svg';
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg';
import tomoLogoUrl from 'assets/svg/tomo-logo.svg';
import xmrLogoUrl from 'assets/svg/xmr-logo.svg';
import zecLogoUrl from 'assets/svg/zec-logo.svg';
import zilLogoUrl from 'assets/svg/zil-logo.svg';
import { isMainnet } from 'config';

import { SupportedChainId } from './chains';
const { PRVIDSTR } = require('incognito-chain-web-js/build/web/wallet');

const CRYPTO_ICON_URL = 'https://statics.incognito.org/cmc/symbols/128x128';

const PRV = {
  id: PRVIDSTR,
  name: 'Privacy',
  displayName: 'Privacy',
  symbol: 'PRV',
  pDecimals: 9,
  hasIcon: true,
  originalSymbol: 'PRV',
  isVerified: true,
  identify: `${PRVIDSTR}-${0}`,
};

const NETWORK_NAME = {
  BINANCE: 'Binance',
  ETHEREUM: 'Ethereum',
  TOMO: 'TomoChain',
  BSC: 'Binance Smart Chain',
  PRV: 'Privacy',
  POLYGON: 'Polygon',
  FANTOM: 'Fantom',
};

const PRIVATE_TOKEN_CURRENCY_TYPE = {
  PRV: 0,
  ETH: 1,
  BTC: 2,
  ERC20: 3,
  BNB: 4,
  BNB_BEP2: 5,
  USD: 6,
  BSC_BNB: 7,
  BSC_BEP20: 8,
  TOMO: 9,
  ZIL: 10,
  XMR: 11,
  NEO: 12,
  DASH: 13,
  LTC: 14,
  DOGE: 15,
  ZEC: 16,
  DOT: 17,
  INCOGNITO: 18,
  MATIC: 19,
  POLYGON_ERC20: 20,
  FTM: 21,
  FANTOM_ERC20: 22,
  UNIFIED_TOKEN: 25,
};

const PRIVATE_TOKEN_CURRENCY_NAME = {
  [PRIVATE_TOKEN_CURRENCY_TYPE.ETH]: 'Ethereum',
  [PRIVATE_TOKEN_CURRENCY_TYPE.ERC20]: 'Ethereum',

  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB]: 'BSC',
  [PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2]: 'BSC',
  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20]: 'BSC',

  [PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20]: 'Polygon',
  [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC]: 'Polygon',

  [PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20]: 'Fantom',
  [PRIVATE_TOKEN_CURRENCY_TYPE.FTM]: 'Fantom',
};

const DECIMALS = {
  MAIN_CRYPTO_CURRENCY: 9,
  [PRV.symbol]: 9,
};

const BIG_COINS = {
  PRV: { tokenID: PRV.id },
  USDT: {
    tokenID: isMainnet
      ? '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0'
      : 'fdd928bc86c82bd2a7c54082a68332ebb5f2cde842b1c2e0fa430ededb6e369e',
  },
  ETH: {
    tokenID: isMainnet
      ? 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f'
      : 'ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854',
  },
  ETH_UNIFIED: {
    tokenID: isMainnet
      ? '3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e'
      : 'b366fa400c36e6bbcf24ac3e99c90406ddc64346ab0b7ba21e159b83d938812d',
  },
};

const PRIVATE_TOKEN_TYPE = {
  COIN: 0,
  TOKEN: 1, // including ERC20, BEP1, BEP2,...
};

interface IGroupNetwork {
  [key: string]: number[];
}

enum MAIN_NETWORK_NAME {
  PRV = 'Privacy',
  ETHEREUM = 'Ethereum',
  BSC = 'BSC',
  POLYGON = 'Polygon',
  FANTOM = 'Fantom',
  INCOGNITO = 'Incognito',
  TOMO = 'TomoChain',
  ZIL = 'Zilliqua',
  XMR = 'Monero',
  NEO = 'NEO',
  DASH = 'DASH',
  DOT = 'DOT',
  LTC = 'Litecoin',
  DOGE = 'DOGE',
  ZEC = 'Zcash',
  BTC = 'Bitcoin',
}

const MAIN_NETWORK_NAME_ICON: any = {
  [MAIN_NETWORK_NAME.ETHEREUM]: ethereumLogoUrl,
  [MAIN_NETWORK_NAME.BSC]: bnbChainLogo,
  [MAIN_NETWORK_NAME.POLYGON]: polygonMaticLogo,
  [MAIN_NETWORK_NAME.FANTOM]: ftmLogoUrl,
  [MAIN_NETWORK_NAME.INCOGNITO]: incognitoLogoUrl,

  [MAIN_NETWORK_NAME.BTC]: btcLogoUrl,
  [MAIN_NETWORK_NAME.DASH]: dashLogoUrl,
  [MAIN_NETWORK_NAME.DOGE]: dogeLogoUrl,
  [MAIN_NETWORK_NAME.DOT]: dotLogoUrl,
  [MAIN_NETWORK_NAME.LTC]: ltcLogoUrl,
  [MAIN_NETWORK_NAME.NEO]: neoLogoUrl,
  [MAIN_NETWORK_NAME.TOMO]: tomoLogoUrl,
  [MAIN_NETWORK_NAME.XMR]: xmrLogoUrl,
  [MAIN_NETWORK_NAME.ZEC]: zecLogoUrl,
  [MAIN_NETWORK_NAME.ZIL]: zilLogoUrl,
};

const GROUP_NETWORK: IGroupNetwork = {
  [MAIN_NETWORK_NAME.ETHEREUM]: [PRIVATE_TOKEN_CURRENCY_TYPE.ETH, PRIVATE_TOKEN_CURRENCY_TYPE.ERC20],
  [MAIN_NETWORK_NAME.BSC]: [
    PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB,
    // PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2,
    PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20,
  ],
  [MAIN_NETWORK_NAME.POLYGON]: [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC, PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20],
  [MAIN_NETWORK_NAME.FANTOM]: [PRIVATE_TOKEN_CURRENCY_TYPE.FTM, PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20],
  [MAIN_NETWORK_NAME.INCOGNITO]: [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN, PRIVATE_TOKEN_CURRENCY_TYPE.PRV],

  [MAIN_NETWORK_NAME.BTC]: [PRIVATE_TOKEN_CURRENCY_TYPE.BTC],
  [MAIN_NETWORK_NAME.DASH]: [PRIVATE_TOKEN_CURRENCY_TYPE.DASH],
  [MAIN_NETWORK_NAME.DOGE]: [PRIVATE_TOKEN_CURRENCY_TYPE.DOGE],
  [MAIN_NETWORK_NAME.DOT]: [PRIVATE_TOKEN_CURRENCY_TYPE.DOT],
  [MAIN_NETWORK_NAME.LTC]: [PRIVATE_TOKEN_CURRENCY_TYPE.LTC],
  [MAIN_NETWORK_NAME.NEO]: [PRIVATE_TOKEN_CURRENCY_TYPE.NEO],
  [MAIN_NETWORK_NAME.TOMO]: [PRIVATE_TOKEN_CURRENCY_TYPE.TOMO],
  [MAIN_NETWORK_NAME.XMR]: [PRIVATE_TOKEN_CURRENCY_TYPE.XMR],
  [MAIN_NETWORK_NAME.ZEC]: [PRIVATE_TOKEN_CURRENCY_TYPE.ZEC],
  [MAIN_NETWORK_NAME.ZIL]: [PRIVATE_TOKEN_CURRENCY_TYPE.ZIL],
};

const ROOT_NETWORK_IMG: any = {
  [PRIVATE_TOKEN_CURRENCY_TYPE.ETH]: ethereumLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.ERC20]: ethereumLogoUrl,

  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB]: bnbChainLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2]: bnbChainLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20]: bnbChainLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC]: polygonMaticLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20]: polygonMaticLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.FTM]: ftmLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20]: ftmLogoUrl,

  [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN]: incognitoLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO]: incognitoLogoUrl,

  [PRIVATE_TOKEN_CURRENCY_TYPE.BTC]: btcLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.DASH]: dashLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.DOGE]: dogeLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.DOT]: dotLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.LTC]: ltcLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.NEO]: neoLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.TOMO]: tomoLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.XMR]: xmrLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.ZEC]: zecLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.ZIL]: zilLogoUrl,
};

const CONNECT_NETWORK_IMG: any = {
  [SupportedChainId.KOVAN]: ethereumLogoUrl,
  [SupportedChainId.MAINNET]: ethereumLogoUrl,
  [SupportedChainId.GOERLI_ETH]: ethereumLogoUrl,

  [SupportedChainId.BSC]: bnbChainLogo,
  [SupportedChainId.BSC_TESTNET]: bnbChainLogo,

  [SupportedChainId.POLYGON]: polygonMaticLogo,
  [SupportedChainId.POLYGON_MUMBAI]: polygonMaticLogo,

  [SupportedChainId.FTM]: ftmLogoUrl,
  [SupportedChainId.FTM_TESTNET]: ftmLogoUrl,
};

export {
  BIG_COINS,
  CONNECT_NETWORK_IMG,
  CRYPTO_ICON_URL,
  DECIMALS,
  GROUP_NETWORK,
  MAIN_NETWORK_NAME,
  MAIN_NETWORK_NAME_ICON,
  NETWORK_NAME,
  PRIVATE_TOKEN_CURRENCY_NAME,
  PRIVATE_TOKEN_CURRENCY_TYPE,
  PRIVATE_TOKEN_TYPE,
  PRV,
  ROOT_NETWORK_IMG,
};
