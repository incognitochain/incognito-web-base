import ethereumLogoUrl from 'assets/images/ethereum-logo.svg';
import ftmLogoUrl from 'assets/images/ftm_logo.svg';
import auroraLogo from 'assets/svg/aurora-logo.svg';
import avalancheLogo from 'assets/svg/avalanche-logo.svg';
import bnbChainLogo from 'assets/svg/bnbchain-logo.svg';
import nearLogo from 'assets/svg/near-logo.svg';
import optimismLogoUrl from 'assets/svg/optimistic_ethereum.svg';
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg';
import ms from 'ms.macro';

import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from './chains';
import { OPTIMISM_LIST } from './lists';

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType;
  readonly blockWaitMsBeforeWarning?: number;
  readonly docs: string;
  readonly bridge?: string;
  readonly explorer: string;
  readonly infoLink: string;
  readonly logoUrl: string;
  readonly label: string;
  readonly helpCenterUrl?: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1;
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2;
  readonly bridge: string;
  readonly statusPage?: string;
  readonly defaultListUrl: string;
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI_ETH]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Goerli Ether', symbol: 'goerliETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimistic Kovan',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Optimistic Kovan Ether', symbol: 'kovOpETH', decimals: 18 },
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon Mumbai',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 },
  },
  [SupportedChainId.BSC]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'BSC',
    logoUrl: bnbChainLogo,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.BSC_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://incognito.org/',
    label: 'BSC Chain Testnet',
    logoUrl: bnbChainLogo,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.FTM_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://testnet.ftmscan.com',
    infoLink: 'https://incognito.org/',
    label: 'FTM Chain Testnet',
    logoUrl: bnbChainLogo,
    nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  },
  [SupportedChainId.FTM]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://rpc.ftm.tools',
    infoLink: 'https://incognito.org/',
    label: 'FTM Chain',
    logoUrl: ftmLogoUrl,
    nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  },

  [SupportedChainId.AVAX]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://snowtrace.io',
    infoLink: 'https://incognito.org/',
    label: 'Avalanche C-Chain',
    logoUrl: avalancheLogo,
    nativeCurrency: { name: 'Avax', symbol: 'AVAX', decimals: 18 },
  },
  [SupportedChainId.AVAX_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://testnet.snowtrace.io',
    infoLink: 'https://incognito.org/',
    label: 'Avalanche C-Chain Testnet',
    logoUrl: avalancheLogo,
    nativeCurrency: { name: 'Avax', symbol: 'AVAX', decimals: 18 },
  },
  [SupportedChainId.AURORA]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://explorer.mainnet.aurora.dev',
    infoLink: 'https://incognito.org/',
    label: 'Aurora Chain',
    logoUrl: auroraLogo,
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.AURORA_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://explorer.testnet.aurora.dev',
    infoLink: 'https://incognito.org/',
    label: 'Aurora Chain Testnet',
    logoUrl: auroraLogo,
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.NEAR]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'hhttps://explorer.near.org',
    infoLink: 'https://incognito.org/',
    label: 'Near Chain',
    logoUrl: nearLogo,
    nativeCurrency: { name: 'Near', symbol: 'NEAR', decimals: 24 },
  },
  [SupportedChainId.NEAR_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://incognito.org/',
    explorer: 'https://explorer.testnet.near.org',
    infoLink: 'https://incognito.org/',
    label: 'Near Chain Testnet',
    logoUrl: nearLogo,
    nativeCurrency: { name: 'Near', symbol: 'NEAR', decimals: 24 },
  },
};
