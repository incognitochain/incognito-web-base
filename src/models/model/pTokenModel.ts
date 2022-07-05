import { CRYPTO_ICON_URL, PRIVATE_TOKEN_CURRENCY_TYPE, PRIVATE_TOKEN_TYPE, PRV } from 'constants/token';

const PRVIDSTR = PRV.id;

class PToken {
  tokenID: string;
  isPRV: boolean;
  parentTokenID: string;
  movedUnifiedToken: boolean;

  isMainCrypto: boolean;
  isPToken: boolean;

  symbol: string;
  name: string;
  shortName: string;
  network: string;
  iconUrl: string;

  contractID: any;
  type: number; // coin or token

  change: string;
  pricePRV: number;
  priceUSD: number;

  decimals: number;
  pDecimals: number;

  isVerified: boolean;
  currencyType: number;

  listChildToken: PToken[];
  listUnifiedToken: PToken[];

  isMainETH: boolean;
  isMainBSC: boolean;
  isMainBNB: boolean;
  isMainMATIC: boolean;

  isIncognitoToken: boolean;
  isErc20Token: boolean;
  isBep2Token: boolean;
  isPolygonErc20Token: boolean;
  isFantomErc20Token: boolean;
  isBep20Token: boolean;

  isDecentralized: boolean;
  isCentralized: boolean;

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
    this.parentTokenID = data.TokenID;

    this.symbol = data.Symbol;
    this.iconUrl = this.getIconUrl({ url: data.Image });
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
    this.decimals = data.Decimals;
    this.pDecimals = data.PDecimals;
    this.isVerified = data.Verified;
    this.currencyType = data.CurrencyType; // including ERC20, BEP1, BEP2,...
    this.priceUSD = data?.PriceUsd;
    this.pricePRV = data?.PricePrv || 0;

    this.change = data?.PercentChange24h || '';
    this.network = data?.Network;
    this.movedUnifiedToken = data?.MovedUnifiedToken;

    // Token
    this.isMainETH = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
    this.isMainBSC = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
    this.isMainBNB = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
    this.isMainMATIC = this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;

    // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = !this.isPToken && !this.isMainCrypto;
    this.isErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.isPolygonErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20;
    this.isFantomErc20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20;
    this.isBep20Token = isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20;

    this.isDecentralized =
      this.isErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH) ||
      this.isBep20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) ||
      this.isPolygonErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) ||
      this.isFantomErc20Token ||
      (!this.isPRV && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM);
    this.isCentralized = !this.isPRV && !this.isDecentralized;

    if (data && data.ListChildToken instanceof Array) {
      this.listChildToken = data.ListChildToken.map((item: any) => {
        const newItem = new PToken(item);
        newItem.parentTokenID = data.TokenID;
        return newItem;
      });
    } else {
      this.listChildToken = [];
    }
    if (data && data.ListUnifiedToken instanceof Array) {
      this.listUnifiedToken = data.ListUnifiedToken.map((item: any) => {
        const newItem = new PToken(item);
        newItem.parentTokenID = data.TokenID;
        return newItem;
      });
    } else {
      this.listUnifiedToken = [];
    }
  }
}

export default PToken;
