import { isMainnet } from '../config';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from '../constants';
import { SupportedChainId } from '../constants/chains';

const getChainIDByCurrency = ({ currency }: { currency: number }): SupportedChainId | undefined => {
  let chainID = undefined;
  switch (currency) {
    case PRIVATE_TOKEN_CURRENCY_TYPE.ETH:
    case PRIVATE_TOKEN_CURRENCY_TYPE.ERC20:
      chainID = isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.BNB:
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20:
      chainID = isMainnet ? SupportedChainId.BSC : SupportedChainId.BSC_TESTNET;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.MATIC:
    case PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20:
      chainID = isMainnet ? SupportedChainId.POLYGON : SupportedChainId.POLYGON_MUMBAI;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.FTM:
    case PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20:
      chainID = isMainnet ? SupportedChainId.POLYGON : SupportedChainId.POLYGON_MUMBAI;
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
    case PRIVATE_TOKEN_CURRENCY_TYPE.BNB:
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
  }
  return networkName;
};

export { getChainIDByCurrency, getNetworkNameByCurrency };
