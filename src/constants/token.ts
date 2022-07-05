const CRYPTO_ICON_URL = 'https://statics.incognito.org/cmc/symbols/128x128';
const isMainnet = false;

const PRV = {
  id: '0000000000000000000000000000000000000000000000000000000000000004',
  name: 'Privacy',
  displayName: 'Privacy',
  symbol: 'PRV',
  pDecimals: 9,
  hasIcon: true,
  originalSymbol: 'PRV',
  isVerified: true,
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
    PRIVATE_TOKEN_CURRENCY_TYPE.BNB,
    PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2,
    PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20,
  ], // TODO
  [MAIN_NETWORK_NAME.POLYGON]: [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC, PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20],
  [MAIN_NETWORK_NAME.FANTOM]: [PRIVATE_TOKEN_CURRENCY_TYPE.FTM, PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20],
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
};
