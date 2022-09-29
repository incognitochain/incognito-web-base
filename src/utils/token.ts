import { isMainnet } from '../config';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from '../constants';
import { SupportedChainId } from '../constants/chains';
import SelectedPrivacyModel from '../models/model/SelectedPrivacyModel';

const getChainIDByCurrency = ({ currency }: { currency: number }): SupportedChainId | undefined => {
  let chainID = undefined;
  switch (currency) {
    case PRIVATE_TOKEN_CURRENCY_TYPE.ETH:
    case PRIVATE_TOKEN_CURRENCY_TYPE.ERC20:
      chainID = isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB:
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20:
      chainID = isMainnet ? SupportedChainId.BSC : SupportedChainId.BSC_TESTNET;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.MATIC:
    case PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20:
      chainID = isMainnet ? SupportedChainId.POLYGON : SupportedChainId.POLYGON_MUMBAI;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.FTM:
    case PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20:
      chainID = isMainnet ? SupportedChainId.FTM : SupportedChainId.FTM_TESTNET;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN:
      chainID = 25;
      break;
  }
  return chainID;
};

const getNetworkNameByCurrency = ({ currency }: { currency: number }): MAIN_NETWORK_NAME | undefined => {
  let networkName = undefined;
  switch (currency) {
    case PRIVATE_TOKEN_CURRENCY_TYPE.ETH:
    case PRIVATE_TOKEN_CURRENCY_TYPE.ERC20:
      networkName = MAIN_NETWORK_NAME.ETHEREUM;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB:
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20:
      networkName = MAIN_NETWORK_NAME.BSC;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.MATIC:
    case PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20:
      networkName = MAIN_NETWORK_NAME.POLYGON;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.FTM:
    case PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20:
      networkName = MAIN_NETWORK_NAME.FANTOM;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN:
      networkName = MAIN_NETWORK_NAME.INCOGNITO;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.BTC:
      networkName = MAIN_NETWORK_NAME.BTC;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.DASH:
      networkName = MAIN_NETWORK_NAME.DASH;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.DOGE:
      networkName = MAIN_NETWORK_NAME.DOGE;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.DOT:
      networkName = MAIN_NETWORK_NAME.DOT;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.LTC:
      networkName = MAIN_NETWORK_NAME.LTC;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.NEO:
      networkName = MAIN_NETWORK_NAME.NEO;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.TOMO:
      networkName = MAIN_NETWORK_NAME.TOMO;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.XMR:
      networkName = MAIN_NETWORK_NAME.XMR;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.ZEC:
      networkName = MAIN_NETWORK_NAME.ZEC;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.ZIL:
      networkName = MAIN_NETWORK_NAME.ZIL;
      break;
  }
  return networkName;
};

const getAcronymNetwork = (token: SelectedPrivacyModel): string => {
  let network = '';
  if (token.isErc20Token || token.isMainETH) {
    network = 'eth';
  } else if (token.isPolygonErc20Token || token.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) {
    network = 'plg';
  } else if (token.isFantomErc20Token || token.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM) {
    network = 'ftm';
  } else if (token.isBep20Token || token.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) {
    network = 'bsc';
  } else if (token.isBTC) {
    network = 'btc';
  } else if (token.isCentralized) {
    network = 'centralized';
  }
  return network;
};

const getChainIDByAcronymNetwork = (network: string): number | any => {
  let chainID = 0;
  switch (network) {
    case 'eth':
      chainID = isMainnet ? SupportedChainId.MAINNET : SupportedChainId.GOERLI_ETH;
      break;
    case 'bsc':
      chainID = isMainnet ? SupportedChainId.BSC : SupportedChainId.BSC_TESTNET;
      break;
    case 'plg':
      chainID = isMainnet ? SupportedChainId.POLYGON : SupportedChainId.POLYGON_MUMBAI;
      break;
    case 'ftm':
      chainID = isMainnet ? SupportedChainId.FTM : SupportedChainId.FTM_TESTNET;
      break;
  }
  return chainID;
};

export { getAcronymNetwork, getChainIDByAcronymNetwork, getChainIDByCurrency, getNetworkNameByCurrency };
