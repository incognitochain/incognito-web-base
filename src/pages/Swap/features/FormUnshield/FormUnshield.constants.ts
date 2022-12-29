import { BIG_COINS, MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import { getTokenIdentify } from 'models/model/pTokenModel';

import { SwapExchange } from './FormUnshield.types';

export const BLACKLIST_PRV_EVM = [
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ERC20 }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20 }),
];

export const BLACKLIST_PRV = [
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.PRV }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.ERC20 }),
  getTokenIdentify({ tokenID: PRV.id, currencyType: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20 }),
];

export const MAP_TOKEN_BY_PAPPS: any = {
  [SwapExchange.PANCAKE_SWAP]: { tokenID1: BIG_COINS.USDC_UNIFIED.tokenID, tokenID2: BIG_COINS.BNB.tokenID },
  [SwapExchange.UNISWAP]: { tokenID1: BIG_COINS.USDC_UNIFIED.tokenID, tokenID2: BIG_COINS.ETH_UNIFIED.tokenID },
  [SwapExchange.CURVE]: { tokenID1: BIG_COINS.USDC_UNIFIED.tokenID, tokenID2: BIG_COINS.USDT_UNIFIED.tokenID },
  [SwapExchange.SPOOKY]: { tokenID1: BIG_COINS.USDC_FTM.tokenID, tokenID2: BIG_COINS.FTM.tokenID },
  [SwapExchange.JOE]: { tokenID1: BIG_COINS.USDC_AVAX.tokenID, tokenID2: BIG_COINS.AVAX.tokenID },
  [SwapExchange.PDEX]: { tokenID1: BIG_COINS.USDT_UNIFIED.tokenID, tokenID2: BIG_COINS.PRV.tokenID },
  [SwapExchange.TRISOLARIS]: { tokenID1: BIG_COINS.ETH_AURORA.tokenID, tokenID2: BIG_COINS.NEAR_AURORA.tokenID },
};

export const GROUP_CURRENCY_TYPE_BY_PAPP_NAME: any = {
  [SwapExchange.UNISWAP]: [
    PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
    PRIVATE_TOKEN_CURRENCY_TYPE.ERC20,
    PRIVATE_TOKEN_CURRENCY_TYPE.MATIC,
    PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20,
  ],

  [SwapExchange.PANCAKE_SWAP]: [PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB, PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20],

  [SwapExchange.CURVE]: [PRIVATE_TOKEN_CURRENCY_TYPE.MATIC, PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20],

  [SwapExchange.SPOOKY]: [PRIVATE_TOKEN_CURRENCY_TYPE.FTM, PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20],

  [SwapExchange.JOE]: [PRIVATE_TOKEN_CURRENCY_TYPE.AVAX, PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20],

  [SwapExchange.TRISOLARIS]: [PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH, PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20],

  [SwapExchange.PDEX]: [...Object.values(PRIVATE_TOKEN_CURRENCY_TYPE)],
};

export const GROUP_SUPPORTED_NETWORK_BY_PAPPS: any = {
  [SwapExchange.UNISWAP]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.ETHEREUM, MAIN_NETWORK_NAME.POLYGON],

  [SwapExchange.PANCAKE_SWAP]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.BSC],

  [SwapExchange.CURVE]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.POLYGON],

  [SwapExchange.SPOOKY]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.FANTOM],

  [SwapExchange.JOE]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.AVALANCHE],

  [SwapExchange.TRISOLARIS]: [MAIN_NETWORK_NAME.INCOGNITO, MAIN_NETWORK_NAME.AURORA],

  [SwapExchange.PDEX]: [...Object.values(MAIN_NETWORK_NAME)],
};

export const SELECTION_NETWORKS: any[] = [
  {
    label: 'All',
    network: [
      MAIN_NETWORK_NAME.ETHEREUM,
      MAIN_NETWORK_NAME.BSC,
      MAIN_NETWORK_NAME.POLYGON,
      MAIN_NETWORK_NAME.FANTOM,
      MAIN_NETWORK_NAME.AVALANCHE,
      MAIN_NETWORK_NAME.AURORA,
    ],
  },
  {
    label: MAIN_NETWORK_NAME.BTC,
    network: [MAIN_NETWORK_NAME.INCOGNITO],
  },
  {
    label: MAIN_NETWORK_NAME.XMR,
    network: [MAIN_NETWORK_NAME.INCOGNITO],
  },
  {
    label: MAIN_NETWORK_NAME.ETHEREUM,
    network: [MAIN_NETWORK_NAME.ETHEREUM],
  },
  {
    label: 'Binance Chain',
    network: [MAIN_NETWORK_NAME.BSC],
  },
  {
    label: MAIN_NETWORK_NAME.POLYGON,
    network: [MAIN_NETWORK_NAME.POLYGON],
  },
  {
    label: MAIN_NETWORK_NAME.FANTOM,
    network: [MAIN_NETWORK_NAME.FANTOM],
  },
  {
    label: MAIN_NETWORK_NAME.AVALANCHE,
    network: [MAIN_NETWORK_NAME.AVALANCHE],
  },
  {
    label: MAIN_NETWORK_NAME.AURORA,
    network: [MAIN_NETWORK_NAME.AURORA],
  },
];
export const GROUP_NETWORK_ID_BY_EXCHANGE: any = {
  [SwapExchange.UNISWAP]: [1, 3],

  [SwapExchange.PANCAKE_SWAP]: [2],

  [SwapExchange.CURVE]: [3],

  [SwapExchange.SPOOKY]: [4],

  [SwapExchange.JOE]: [6],

  [SwapExchange.TRISOLARIS]: [7],

  [SwapExchange.PDEX]: [],
};
