import { JsonRpcProvider } from '@ethersproject/providers';

import { SupportedChainId } from './chains';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}

export const MAINNET_PROVIDER = new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_KEY}`);

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INFURA_NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://eth-fullnode.incognito.org`,
  [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/8c1ae0e623704f288eab73928a9243f5`,
  [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.POLYGON_MUMBAI]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,

  // TODO:
  [SupportedChainId.BSC]: `https://bsc-dataseed1.ninicoin.io`,
  [SupportedChainId.BSC_TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545`,
};
