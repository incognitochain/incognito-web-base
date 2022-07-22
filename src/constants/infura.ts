import { JsonRpcProvider } from '@ethersproject/providers';
import Web3 from 'web3';

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
  [SupportedChainId.POLYGON_MUMBAI]: 'https://rpc-mumbai.maticvigil.com',

  [SupportedChainId.BSC]: `https://bsc-dataseed1.ninicoin.io`,
  [SupportedChainId.BSC_TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545`,

  [SupportedChainId.FTM]: `https://rpcapi.fantom.network`,
  [SupportedChainId.FTM_TESTNET]: `https://rpc.testnet.fantom.network`,
};

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INC_CONTRACT_ADDRESS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: '0x43D037A562099A4C2c95b1E2120cc43054450629',
  [SupportedChainId.KOVAN]: '0x2f6F03F1b43Eab22f7952bd617A24AB46E970dF7',

  [SupportedChainId.OPTIMISM]: '0x43D037A562099A4C2c95b1E2120cc43054450629',
  [SupportedChainId.OPTIMISTIC_KOVAN]: '0x43D037A562099A4C2c95b1E2120cc43054450629',

  [SupportedChainId.POLYGON]: '0x43D037A562099A4C2c95b1E2120cc43054450629',
  [SupportedChainId.POLYGON_MUMBAI]: '0x4fF5c88cD1FD773436C2aBcFE175fe4ba6a2eB68',

  [SupportedChainId.BSC]: '0x43D037A562099A4C2c95b1E2120cc43054450629',
  [SupportedChainId.BSC_TESTNET]: '0x2f6F03F1b43Eab22f7952bd617A24AB46E970dF7',

  [SupportedChainId.FTM]: '0x43D037A562099A4C2c95b1E2120cc43054450629',
  [SupportedChainId.FTM_TESTNET]: '0x9cb4baf1b60DaBB6B22BcFf07cc0e10395423aed',
};

export const getWeb3 = ({ chainId }: { chainId: SupportedChainId }): Web3 => {
  return new Web3(INFURA_NETWORK_URLS[chainId]);
};

export const getINCContractAddress = ({ chainId }: { chainId: SupportedChainId }): string => {
  return INC_CONTRACT_ADDRESS[chainId];
};
