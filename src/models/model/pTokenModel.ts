import { SupportedChainId } from 'constants/chains';
import {
  CRYPTO_ICON_URL,
  MAIN_NETWORK_NAME,
  PRIVATE_TOKEN_CURRENCY_TYPE,
  PRIVATE_TOKEN_TYPE,
  PRV,
  UN_SUPPORTED_NETWORK,
} from 'constants/token';
import isEmpty from 'lodash/isEmpty';
import { getChainIDByCurrency, getNetworkNameByCurrency } from 'utils/token';

const PRVIDSTR = PRV.id;

export interface ITokenNetwork {
  parentIdentify?: string;
  identify: string;
  chainID?: SupportedChainId;
  networkName: MAIN_NETWORK_NAME;
  currency: number;
}

export const getTokenIdentify = ({ tokenID, currencyType }: { tokenID: string; currencyType: number }) =>
  `${tokenID}-${currencyType}`;

class PToken {
  identify: string;
  tokenID: string;
  isPRV: boolean;
  parentTokenID: string;
  movedUnifiedToken: boolean;

  isMainCrypto: boolean;
  isPToken: boolean;

  symbol: string;
  pSymbol: string;
  name: string;
  shortName: string;
  network: string;
  networkName?: MAIN_NETWORK_NAME;
  supportedNetwork?: ITokenNetwork[];
  chainID?: SupportedChainId;
  iconUrl: string;

  contractID: any;
  contractIDSwap: any;
  type: number; // coin or token

  change: string;
  pricePRV: number;
  priceUSD: number;

  decimals: number;
  pDecimals: number;

  isVerified: boolean;
  currencyType: number;
  networkID: number;

  listChildToken: PToken[];
  listUnifiedToken: PToken[];

  isMainETH: boolean;
  isMainBSC: boolean;
  isMainBNB: boolean;
  isMainMATIC: boolean;
  isMainFTM: boolean;
  isMainAVAX: boolean;
  isMainAURORA: boolean;
  isMainNEAR: boolean;
  isMainEVMToken: boolean;

  incognitoTotalSupply: any;
  isIncognitoToken: boolean;
  isErc20Token: boolean;
  isBep2Token: boolean;
  isPolygonErc20Token: boolean;
  isFantomErc20Token: boolean;
  isBep20Token: boolean;
  isAvaxErc20Token: boolean;
  isAuroraErc20Token: boolean;
  isNearToken: boolean;

  isDecentralized: boolean;
  isCentralized: boolean;
  isBTC: boolean;

  hasChild: boolean;
  isUnified: boolean;

  isDepositable: boolean;
  poolPair: string;
  totalSupply: any;

  getIconUrl({ url }: { url: string }) {
    if (this.tokenID === PRVIDSTR) {
      return 'https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png';
    }
    if (this.isMainCrypto || this.isPToken) {
      const formatedSymbol = String(this.symbol).toUpperCase();
      url = `${CRYPTO_ICON_URL}/${formatedSymbol}.png`;
    }
    return url;
  }

  combineData(pData: any, defaultData: any) {
    if (typeof pData === 'boolean') {
      return pData;
    }
    return pData || defaultData;
  }

  constructor(data: any = {}) {
    this.tokenID = data.TokenID;
    this.isPRV = this.tokenID === PRVIDSTR;

    this.symbol = data.Symbol;
    this.pSymbol = data.PSymbol;
    this.name = data.Name;
    this.shortName = this.name;
    if (this.shortName) {
      this.shortName = this.name.replace(/ *\([^)]*\) */g, '');
    }

    this.isMainCrypto = this.tokenID === PRVIDSTR;
    this.isPToken = !!this.symbol;
    // coin or token
    this.type = data.Type;
    // ERC20 tokens, BEP2 tokens, smart-contract Tokens
    const isPrivateToken = this.type === PRIVATE_TOKEN_TYPE.TOKEN;

    this.contractID = data.ContractID;
    this.contractIDSwap = data.ContractIDSwap;
    this.decimals = data.Decimals;
    this.pDecimals = data.PDecimals;
    this.isVerified = data.Verified;
    this.currencyType = data.CurrencyType; // including ERC20, BEP1, BEP2,...
    this.networkID = data.NetworkID;
    this.priceUSD = data?.PriceUsd;
    this.pricePRV = data?.PricePrv || 0;

    this.change = data?.PercentChange24h || '';
    this.network = ['Incognito', 'Unified'].includes(data?.Network) ? 'Incognito' : `p${data?.Network}`;
    this.movedUnifiedToken = data?.MovedUnifiedToken;

    // Token
    this.isMainETH = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
    this.isMainBSC = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
    this.isMainBNB = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
    this.isMainMATIC = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;
    this.isMainFTM = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM;
    this.isMainAVAX = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AVAX;
    this.isMainAURORA = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH;
    this.isMainNEAR = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.NEAR;
    this.isMainEVMToken =
      this.isMainETH ||
      this.isMainBSC ||
      this.isMainBNB ||
      this.isMainMATIC ||
      this.isMainFTM ||
      this.isMainAVAX ||
      this.isMainAURORA ||
      this.isMainNEAR;

    // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = !this.isPToken && !this.isMainCrypto;

    this.isErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.isPolygonErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20;
    this.isFantomErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20;
    this.isBep20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20;
    this.isAvaxErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AVAX_ERC20;
    this.isAuroraErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ERC20;
    this.isNearToken = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.NEAR_TOKEN;

    this.isDecentralized =
      this.isErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH) ||
      this.isBep20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) ||
      this.isPolygonErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) ||
      this.isFantomErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM) ||
      this.isAvaxErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AVAX) ||
      this.isAuroraErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH) ||
      this.isNearToken ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.NEAR);
    this.isBTC = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BTC;
    this.isCentralized =
      !this.isPRV &&
      !this.isDecentralized &&
      this.currencyType !== PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN &&
      !this.isBTC;

    this.networkName = getNetworkNameByCurrency({ currency: this.currencyType });
    this.chainID = getChainIDByCurrency({ currency: this.currencyType });
    this.identify = getTokenIdentify({ tokenID: this.tokenID, currencyType: this.currencyType });
    this.parentTokenID = this.identify;
    this.iconUrl = this.getIconUrl({ url: data.Image });
    if (data && data.ListChildToken instanceof Array) {
      this.listChildToken = data.ListChildToken.map((item: any) => {
        const newItem = new PToken(item);
        newItem.parentTokenID = `${data.TokenID}-${data.CurrencyType}`;
        newItem.movedUnifiedToken = true;
        return newItem;
      });
    } else {
      this.listChildToken = [];
    }
    if (data && data.ListUnifiedToken instanceof Array) {
      this.listUnifiedToken = data.ListUnifiedToken.map((item: any) => {
        const newItem = new PToken(item);
        newItem.parentTokenID = `${data.TokenID}-${data.CurrencyType}`;
        return newItem;
      });
    } else {
      this.listUnifiedToken = [];
    }
    const listChild = isEmpty(this.listUnifiedToken) ? this.listChildToken : this.listUnifiedToken;
    // Update ListChildToken to listUnifiedToken
    this.listUnifiedToken = listChild;
    this.supportedNetwork = [];
    this.hasChild = !isEmpty(listChild);
    this.isUnified = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.UNIFIED_TOKEN;
    this.isDepositable = data.Status !== 0;
    this.poolPair = data.DefaultPoolPair || '';

    if (!isEmpty(listChild)) {
      const temp = listChild.map((token) => {
        const { currencyType, networkName, chainID, identify } = token;
        return {
          currency: currencyType,
          networkName,
          chainID,
          identify,
          parentIdentify: this.parentTokenID,
        };
      });
      temp.forEach((data: any) => {
        const { currency, chainID, networkName } = data;
        const isUnSupported = UN_SUPPORTED_NETWORK.includes(currency);
        if ((!currency && !chainID && networkName) || isUnSupported) return;
        this.supportedNetwork?.push(data);
      });
    } else {
      const isUnSupported = UN_SUPPORTED_NETWORK.includes(this.currencyType);
      if (isUnSupported || !this.networkName || this.currencyType === undefined) return;
      this.supportedNetwork = [
        {
          parentIdentify: this.parentTokenID,
          currency: this.currencyType,
          networkName: this.networkName,
          chainID: this.chainID,
          identify: this.identify,
        },
      ];
    }

    // if ((this.isBTC || this.isCentralized) && this.networkName) {
    //   this.supportedNetwork.push({
    //     parentIdentify: this.parentTokenID,
    //     currency: this.currencyType,
    //     networkName: this.networkName || '',
    //     chainID: this.chainID,
    //     identify: this.identify,
    //   });
    // }
  }
}

export default PToken;
