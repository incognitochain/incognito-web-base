import { NetworkTypePayload } from 'pages/Swap/features/FormUnshield/FormUnshield.types';

import { MAIN_NETWORK_NAME } from './token';

const NETWORK_ID_NETWORK_NAME: { [key: string]: number } = {
  [MAIN_NETWORK_NAME.INCOGNITO]: 0,
  [MAIN_NETWORK_NAME.ETHEREUM]: 1,
  [MAIN_NETWORK_NAME.BSC]: 2,
  [MAIN_NETWORK_NAME.POLYGON]: 3,
  [MAIN_NETWORK_NAME.FANTOM]: 4,
  [MAIN_NETWORK_NAME.AURORA]: 5,
  [MAIN_NETWORK_NAME.AVALANCHE]: 6,
};

const NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE: { [key: string]: number } = {
  [NetworkTypePayload.INCOGNITO]: 0,
  [NetworkTypePayload.ETHEREUM]: 1,
  [NetworkTypePayload.BINANCE_SMART_CHAIN]: 2,
  [NetworkTypePayload.POLYGON]: 3,
  [NetworkTypePayload.FANTOM]: 4,
  [NetworkTypePayload.AURORA]: 5,
  [NetworkTypePayload.AVALANCHE]: 6,
};

export { NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE, NETWORK_ID_NETWORK_NAME };
