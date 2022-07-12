import ethereumLogoUrl from 'assets/images/ethereum-logo.png';
import ftmLogoUrl from 'assets/images/ftm_logo.png';
import incognitoLogoUrl from 'assets/images/inc_logo.png';
import bnbChainLogo from 'assets/svg/bnbchain-logo.svg';
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg';
import { isMainnet } from 'config';
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
    tokenID: 'b366fa400c36e6bbcf24ac3e99c90406ddc64346ab0b7ba21e159b83d938812d',
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
  ETHEREUM = 'Ethereum',
  BSC = 'BSC',
  POLYGON = 'Polygon',
  FANTOM = 'Fantom',
  INCOGNITO = 'Incognito',
}

const GROUP_NETWORK: IGroupNetwork = {
  [MAIN_NETWORK_NAME.ETHEREUM]: [PRIVATE_TOKEN_CURRENCY_TYPE.ETH, PRIVATE_TOKEN_CURRENCY_TYPE.ERC20],
  [MAIN_NETWORK_NAME.BSC]: [
    PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB,
    // PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2,
    PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20,
  ],
  [MAIN_NETWORK_NAME.POLYGON]: [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC, PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20],
  [MAIN_NETWORK_NAME.FANTOM]: [PRIVATE_TOKEN_CURRENCY_TYPE.FTM, PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20],
  [MAIN_NETWORK_NAME.INCOGNITO]: [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN],
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
};

export {
  BIG_COINS,
  CRYPTO_ICON_URL,
  DECIMALS,
  GROUP_NETWORK,
  MAIN_NETWORK_NAME,
  NETWORK_NAME,
  PRIVATE_TOKEN_CURRENCY_NAME,
  PRIVATE_TOKEN_CURRENCY_TYPE,
  PRIVATE_TOKEN_TYPE,
  PRV,
  ROOT_NETWORK_IMG,
};
