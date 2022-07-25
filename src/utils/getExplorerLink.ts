import { PRIVATE_TOKEN_CURRENCY_TYPE } from '../constants';
import { SupportedChainId } from '../constants/chains';

// TODO:
const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: 'https://etherscan.io',
  [SupportedChainId.KOVAN]: 'https://kovan.etherscan.io',

  [SupportedChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
  [SupportedChainId.OPTIMISTIC_KOVAN]: 'https://kovan-optimistic.etherscan.io',

  [SupportedChainId.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com',
  [SupportedChainId.POLYGON]: 'https://polygonscan.com',

  [SupportedChainId.BSC]: 'https://bscscan.com/',
  [SupportedChainId.BSC_TESTNET]: 'https://testnet.bscscan.com/',

  [SupportedChainId.FTM]: 'https://ftmscan.com',
  [SupportedChainId.FTM_TESTNET]: 'https://testnet.ftmscan.com/',
};

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  const prefix = ETHERSCAN_PREFIXES[chainId] ?? 'https://etherscan.io';
  if (chainId === PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO) return `https://explorer.incognito.org/tx/${data}`;
  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`;

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`;

    case ExplorerDataType.BLOCK:
      if (chainId === SupportedChainId.OPTIMISM || chainId === SupportedChainId.OPTIMISTIC_KOVAN) {
        return `${prefix}/tx/${data}`;
      }
      return `${prefix}/block/${data}`;

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`;
    default:
      return `${prefix}`;
  }
}
