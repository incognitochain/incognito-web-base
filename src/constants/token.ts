import ethereumLogoUrl from 'assets/images/ethereum-logo.svg';
import ftmLogoUrl from 'assets/images/ftm_logo.svg';
import incognitoLogoUrl from 'assets/images/inc_logo.svg';
import auroraLogo from 'assets/svg/aurora-logo.svg';
import avalancheLogo from 'assets/svg/avalanche-logo.svg';
import bnbChainLogo from 'assets/svg/bnbchain-logo.svg';
import btcLogoUrl from 'assets/svg/btc-logo.svg';
import dashLogoUrl from 'assets/svg/dash-logo.svg';
import dogeLogoUrl from 'assets/svg/doge-logo.svg';
import dotLogoUrl from 'assets/svg/dot-logo.svg';
import ltcLogoUrl from 'assets/svg/ltc-logo.svg';
import nearLogo from 'assets/svg/near-logo.svg';
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

const PRV_TOKEN_ID = '0000000000000000000000000000000000000000000000000000000000000004';

const NETWORK_NAME = {
  BINANCE: 'Binance',
  ETHEREUM: 'Ethereum',
  TOMO: 'TomoChain',
  BSC: 'Binance Smart Chain',
  PRV: 'Privacy',
  POLYGON: 'Polygon',
  FANTOM: 'Fantom',
  AVALANCHE: 'Avalanche',
  AURORA: 'Aurora',
  NEAR: 'Near',
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

  // Avalanche
  AVAX: 28,
  AVAX_ERC20: 29,

  // Aurora
  AURORA_ETH: 30,
  AURORA_ERC20: 31,

  // Near
  NEAR: 26,
  NEAR_TOKEN: 27,
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

  [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX]: 'Avalanche',
  [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20]: 'Avalanche',

  [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH]: 'Aurora',
  [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20]: 'Aurora',

  [PRIVATE_TOKEN_CURRENCY_TYPE.NEAR]: 'Near',
  [PRIVATE_TOKEN_CURRENCY_TYPE.NEAR_TOKEN]: 'Near',

  [PRIVATE_TOKEN_CURRENCY_TYPE.PRV]: 'Incognito',
  [PRIVATE_TOKEN_CURRENCY_TYPE.BTC]: 'Bitcoin',
  [PRIVATE_TOKEN_CURRENCY_TYPE.DASH]: 'DASH',
  [PRIVATE_TOKEN_CURRENCY_TYPE.DOGE]: 'DOGE',
  [PRIVATE_TOKEN_CURRENCY_TYPE.DOT]: 'DOT',
  [PRIVATE_TOKEN_CURRENCY_TYPE.LTC]: 'Litecoin',
  [PRIVATE_TOKEN_CURRENCY_TYPE.NEO]: 'NEO',
  [PRIVATE_TOKEN_CURRENCY_TYPE.TOMO]: 'TomoChain',
  [PRIVATE_TOKEN_CURRENCY_TYPE.XMR]: 'Monero',
  [PRIVATE_TOKEN_CURRENCY_TYPE.ZEC]: 'Zcash',
  [PRIVATE_TOKEN_CURRENCY_TYPE.ZIL]: 'Zilliqua',
  [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN]: 'Unified',
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
  USDC_UNIFIED: {
    tokenID: isMainnet
      ? '545ef6e26d4d428b16117523935b6be85ec0a63e8c2afeb0162315eb0ce3d151'
      : '6fa448f24835b0c72e62004edf391679fdbc391a82e4edb3726d16251509a2d0',
  },
  USDT_UNIFIED: {
    tokenID: isMainnet
      ? '076a4423fa20922526bd50b0d7b0dc1c593ce16e15ba141ede5fb5a28aa3f229'
      : '6fa448f24835b0c72e62004edf391679fdbc391a82e4edb3726d16251509a2d0',
  },
  BITCOIN: {
    tokenID: isMainnet
      ? 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696'
      : 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
  },
  BNB: {
    tokenID: isMainnet
      ? 'e5032c083f0da67ca141331b6005e4a3740c50218f151a5e829e9d03227e33e2'
      : 'e5032c083f0da67ca141331b6005e4a3740c50218f151a5e829e9d03227e33e2',
  },
  FTM: {
    tokenID: isMainnet
      ? '6eed691cb14d11066f939630ff647f5f1c843a8f964d9a4d295fa9cd1111c474'
      : '6eed691cb14d11066f939630ff647f5f1c843a8f964d9a4d295fa9cd1111c474',
  },
  AVAX: {
    tokenID: isMainnet
      ? 'c469fb02623a023b469c81e1564193da7d85fe918cd4a4fdd2c64f97f59f60f5'
      : 'c469fb02623a023b469c81e1564193da7d85fe918cd4a4fdd2c64f97f59f60f5',
  },
  USDC_AVAX: {
    tokenID: isMainnet
      ? '9624c2357d9be1cb0136e2743d891382e754cc82b53bc249a22fb890e62cf3a6'
      : '9624c2357d9be1cb0136e2743d891382e754cc82b53bc249a22fb890e62cf3a6',
  },
};

const PRIVATE_TOKEN_TYPE = {
  COIN: 0,
  TOKEN: 1, // including ERC20, BEP1, BEP2,...
};

export interface IGroupNetwork {
  [key: string]: number[];
}

enum MAIN_NETWORK_NAME {
  PRV = 'Privacy',
  ETHEREUM = 'Ethereum',
  BSC = 'BSC',
  POLYGON = 'Polygon',
  FANTOM = 'Fantom',
  INCOGNITO = 'Incognito',
  AVALANCHE = 'Avalanche',
  AURORA = 'Aurora',
  NEAR = 'Near',
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
  [MAIN_NETWORK_NAME.AVALANCHE]: avalancheLogo,
  [MAIN_NETWORK_NAME.AURORA]: auroraLogo,
  [MAIN_NETWORK_NAME.NEAR]: nearLogo,
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
  [MAIN_NETWORK_NAME.AVALANCHE]: [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX, PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20],
  [MAIN_NETWORK_NAME.AURORA]: [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH, PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20],
  [MAIN_NETWORK_NAME.NEAR]: [PRIVATE_TOKEN_CURRENCY_TYPE.NEAR, PRIVATE_TOKEN_CURRENCY_TYPE.NEAR_TOKEN],
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

  [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX]: avalancheLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20]: avalancheLogo,
  [SupportedChainId.AVAX]: avalancheLogo,
  [SupportedChainId.AVAX_TESTNET]: avalancheLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH]: auroraLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20]: auroraLogo,
  [SupportedChainId.AURORA]: auroraLogo,
  [SupportedChainId.AURORA_TESTNET]: auroraLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.NEAR]: nearLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.NEAR_TOKEN]: nearLogo,
  [SupportedChainId.NEAR]: nearLogo,
  [SupportedChainId.NEAR_TESTNET]: nearLogo,

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

const UN_SUPPORTED_NETWORK: any = [
  // PRIVATE_TOKEN_CURRENCY_TYPE.NEAR,
  // PRIVATE_TOKEN_CURRENCY_TYPE.NEAR_TOKEN,
  // PRIVATE_TOKEN_CURRENCY_TYPE.AVAX,
  // PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20,
  // PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH,
  // PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20,
];

const BTC_TOKEN_ID = 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696';
const ETH_TOKEN_ID = '3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e';
const BNB_TOKEN_ID = 'e5032c083f0da67ca141331b6005e4a3740c50218f151a5e829e9d03227e33e2';
const DAI_TOKEN_ID = '3f89c75324b46f13c7b036871060e641d996a24c09b3065835cb1d38b799d6c1';
const LTC_TOKEN_ID = '7450ad98cb8c967afb76503944ab30b4ce3560ed8f3acc3155f687641ae34135';
const XMR_TOKEN_ID = 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4';
const ZEC_TOKEN_ID = 'a609150120c0247407e6d7725f2a9701dcbb7bab5337a70b9cef801f34bc2b5c';
const USDC_TOKEN_ID = '1ff2da446abfebea3ba30385e2ca99b0f0bbeda5c6371f4c23c939672b429a42';
const DASH_TOKEN_ID = '447b088f1c2a8e08bff622ef43a477e98af22b64ea34f99278f4b550d285fbff';
const USDT_TOKEN_ID = '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0';
const DOGE_TOKEN_ID = '0dfc519d73c1664858ac27111258e0e287f0f6fa900a1ff9d4bb4ad1443092f5';
const BUSD_TOKEN_ID = '9e1142557e63fd20dee7f3c9524ffe0aa41198c494aa8d36447d12e85f0ddce7';
const BAT_TOKEN_ID = '1fe75e9afa01b85126370a1583c7af9f1a5731625ef076ece396fcc6584c2b44';
const LINK_TOKEN_ID = 'e0926da2436adc42e65ca174e590c7b17040cd0b7bdf35982f0dd7fc067f6bcf';
const NEO_TOKEN_ID = '86c45a9fdddc5546e3b4f09dba211b836aefc5d08ed22e7d33cff7f9b8b39c10';
const ZIL_TOKEN_ID = '880ea0787f6c1555e59e3958a595086b7802fc7a38276bcd80d4525606557fbc';

const PRIORITY_TOKEN_ID = [
  // PRV_TOKEN_ID,
  BTC_TOKEN_ID,
  ETH_TOKEN_ID,
  BNB_TOKEN_ID,
  DAI_TOKEN_ID,
  LTC_TOKEN_ID,
  // XMR_TOKEN_ID,
  // ZEC_TOKEN_ID,
  // USDC_TOKEN_ID,
  // DASH_TOKEN_ID,
  USDT_TOKEN_ID,
  // DOGE_TOKEN_ID,
  // BUSD_TOKEN_ID,
  // BAT_TOKEN_ID,
  // LINK_TOKEN_ID,
  // NEO_TOKEN_ID,
  // ZIL_TOKEN_ID,
];

const MAIN_TOKENS = {
  PRV,
  PRV_TOKEN_ID,
  USDT_TOKEN_ID,
  BTC_TOKEN_ID,
  ETH_TOKEN_ID,
  BNB_TOKEN_ID,
  XMR_TOKEN_ID,
  DAI_TOKEN_ID,
  LTC_TOKEN_ID,
  ZEC_TOKEN_ID,
  USDC_TOKEN_ID,
  DASH_TOKEN_ID,
  DOGE_TOKEN_ID,
  BUSD_TOKEN_ID,
  BAT_TOKEN_ID,
  LINK_TOKEN_ID,
  NEO_TOKEN_ID,
  ZIL_TOKEN_ID,
};

export {
  BIG_COINS,
  CONNECT_NETWORK_IMG,
  CRYPTO_ICON_URL,
  DECIMALS,
  GROUP_NETWORK,
  MAIN_NETWORK_NAME,
  MAIN_NETWORK_NAME_ICON,
  MAIN_TOKENS,
  NETWORK_NAME,
  PRIORITY_TOKEN_ID,
  PRIVATE_TOKEN_CURRENCY_NAME,
  PRIVATE_TOKEN_CURRENCY_TYPE,
  PRIVATE_TOKEN_TYPE,
  PRV,
  ROOT_NETWORK_IMG,
  UN_SUPPORTED_NETWORK,
};
