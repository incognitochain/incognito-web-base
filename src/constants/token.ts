import ethereumLogoUrl from 'assets/images/ethereum-logo.svg';
import ftmLogoUrl from 'assets/images/ftm_logo.svg';
import incognitoLogoUrl from 'assets/images/inc_logo.svg';
import bnbChainLogo from 'assets/svg/bnbchain-logo.svg';
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg';
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
    tokenID: isMainnet
      ? '3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e'
      : 'b366fa400c36e6bbcf24ac3e99c90406ddc64346ab0b7ba21e159b83d938812d',
  },
  USDC_UNIFIED: {
    tokenID: isMainnet
      ? '545ef6e26d4d428b16117523935b6be85ec0a63e8c2afeb0162315eb0ce3d151'
      : '6fa448f24835b0c72e62004edf391679fdbc391a82e4edb3726d16251509a2d0',
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

const MAIN_NETWORK_NAME_ICON: any = {
  [MAIN_NETWORK_NAME.ETHEREUM]: ethereumLogoUrl,
  [MAIN_NETWORK_NAME.BSC]: bnbChainLogo,
  [MAIN_NETWORK_NAME.POLYGON]: polygonMaticLogo,
  [MAIN_NETWORK_NAME.FANTOM]: ftmLogoUrl,
  [MAIN_NETWORK_NAME.INCOGNITO]: incognitoLogoUrl,
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
  [MAIN_NETWORK_NAME.INCOGNITO]: [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN],
};

const ROOT_NETWORK_IMG: any = {
  [PRIVATE_TOKEN_CURRENCY_TYPE.ETH]: ethereumLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.ERC20]: ethereumLogoUrl,
  [SupportedChainId.KOVAN]: ethereumLogoUrl,
  [SupportedChainId.MAINNET]: ethereumLogoUrl,

  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB]: bnbChainLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2]: bnbChainLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20]: bnbChainLogo,
  [SupportedChainId.BSC]: bnbChainLogo,
  [SupportedChainId.BSC_TESTNET]: bnbChainLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC]: polygonMaticLogo,
  [PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20]: polygonMaticLogo,
  [SupportedChainId.POLYGON]: polygonMaticLogo,
  [SupportedChainId.POLYGON_MUMBAI]: polygonMaticLogo,

  [PRIVATE_TOKEN_CURRENCY_TYPE.FTM]: ftmLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20]: ftmLogoUrl,
  [SupportedChainId.FTM]: ftmLogoUrl,
  [SupportedChainId.FTM_TESTNET]: ftmLogoUrl,

  [PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN]: incognitoLogoUrl,
  [PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO]: incognitoLogoUrl,
};

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
};
