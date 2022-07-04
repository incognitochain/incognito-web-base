import { BigNumber } from 'bignumber.js';
import {
  BIG_COINS,
  CRYPTO_ICON_URL,
  DECIMALS,
  PRIVATE_TOKEN_CURRENCY_TYPE,
  PRIVATE_TOKEN_TYPE,
  PRV,
} from 'constants/token';
import convert from 'utils/convert';
import format from 'utils/format';

const PRVIDSTR = PRV.id;

class SelectedPrivacy {
  currencyType: any;
  isToken: boolean;
  isMainCrypto: boolean;
  isPrivateToken: boolean;
  isPrivateCoin: boolean;
  isPToken: boolean;
  isIncognitoToken: any;
  isErc20Token: any;
  isBep2Token: any;
  isPolygonErc20Token: any;
  isFantomErc20Token: any;
  isBep20Token: any;
  symbol: any;
  name: any;
  shortName: any;
  displayName: any;
  contractId: any;
  decimals: any;
  pDecimals: number;
  externalSymbol: any;
  paymentAddress: any;
  isWithdrawable: any;
  isDeposable: any;
  isDecentralized: any;
  isCentralized: any;
  incognitoTotalSupply: any;
  isVerified: any;
  externalPriceUSD: any;

  pairWithPrv: any;
  isUSDT: boolean;
  isPRV: boolean;
  listChildToken: any;
  listUnifiedToken: any;

  iconUrl: any;

  defaultPoolPair: any;
  defaultPairToken: any;
  network: any;
  hasSameSymbol: any;
  isETH: boolean;
  isBSC: boolean;
  isBNB: boolean;
  isMATIC: boolean;
  tokenId: string;

  priceUsd: any;
  pricePrv: any;
  change: any;

  amount: number;

  formatAmount?: string;
  formatPriceByUsd?: string;
  formatPriceByPrv?: string;
  formatAmountNoClip?: string;
  formatBalanceByUsd?: string;

  constructor(pTokenData: any = {}, _tokenID: string) {
    const tokenId = pTokenData?.tokenId;
    const isUnknown = _tokenID !== PRVIDSTR && !tokenId;
    const unknownText = 'Incognito Token';

    this.amount = 0;
    this.currencyType = pTokenData.currencyType;
    this.isMainCrypto = _tokenID === PRVIDSTR; // PRV
    this.isToken = tokenId !== PRVIDSTR && !!tokenId;
    this.isPToken = !!pTokenData.pSymbol;

    // ERC20 tokens, BEP2 tokens
    this.isPrivateToken = pTokenData?.type === PRIVATE_TOKEN_TYPE.TOKEN;

    // native coins pETH, pBTC, pTOMO,...
    this.isPrivateCoin = pTokenData?.type === PRIVATE_TOKEN_TYPE.COIN;

    // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = !this.isPToken && !this.isMainCrypto;
    this.isErc20Token = this.isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token = this.isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.isPolygonErc20Token = this.isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20;
    this.isFantomErc20Token = this.isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20;
    this.isBep20Token = this.isPrivateToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20;

    this.symbol = this.combineData(pTokenData?.pSymbol, '');
    this.name = this.combineData(pTokenData?.name, isUnknown ? unknownText : 'Privacy');
    this.displayName = this.combineData(`Privacy ${pTokenData?.symbol}`, isUnknown ? unknownText : 'Privacy');

    this.tokenId = _tokenID ? _tokenID : this.isMainCrypto ? PRVIDSTR : tokenId;
    this.contractId = pTokenData.contractId;
    this.decimals = this.isMainCrypto ? DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.decimals;
    this.pDecimals = this.isMainCrypto ? DECIMALS.MAIN_CRYPTO_CURRENCY : pTokenData.pDecimals || 0;
    this.externalSymbol = pTokenData.symbol;
    this.isWithdrawable = this.isPToken;
    this.isDeposable = this.isPToken;
    this.isDecentralized =
      this.isErc20Token ||
      (this.isToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH) ||
      this.isBep20Token ||
      (this.isToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB) ||
      this.isPolygonErc20Token ||
      (this.isToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC) ||
      this.isFantomErc20Token ||
      (this.isToken && this.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.FTM);
    this.isCentralized = this.isToken && !this.isDecentralized;
    this.incognitoTotalSupply = (this.isIncognitoToken && Number(pTokenData?.totalSupply)) || 0;

    this.isVerified = this.combineData(pTokenData?.verified, !isUnknown); // PRV always is verified

    this.priceUsd = pTokenData?.priceUsd || 0;
    this.externalPriceUSD = pTokenData?.externalPriceUSD || 0;
    this.pricePrv = pTokenData?.pricePrv || 0;
    this.pairWithPrv = pTokenData?.pairPrv;
    this.isUSDT = this.tokenId === BIG_COINS.USDT.tokenID;
    this.isPRV = this.tokenId === BIG_COINS.PRV.tokenID;
    this.symbol = this.externalSymbol || this.symbol || '';
    this.listChildToken = pTokenData?.listChildToken;
    this.listUnifiedToken = pTokenData?.listUnifiedToken;
    this.iconUrl = this.getIconUrl(pTokenData.image);
    this.change = pTokenData?.change;
    this.defaultPoolPair = pTokenData?.defaultPoolPair;
    this.defaultPairToken = pTokenData?.defaultPairToken;
    this.network = pTokenData.network;
    this.hasSameSymbol = pTokenData.hasSameSymbol;

    this.shortName = this.name.replace(/ *\([^)]*\) */g, '');

    // Native Token of Network
    this.isETH = this?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH;
    this.isBSC = this?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB;
    this.isBNB = this?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BNB;
    this.isMATIC = this?.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.MATIC;

    // amount
    // const followToken = followTokens.find(({ id }) => id === tokenId);
    const followToken = undefined;
    if (followToken) {
      const { amount } = followToken;
      this.amount = new BigNumber(amount || '0').toNumber();

      const formatPriceByUsd = format.formatAmount({
        humanAmount: this.priceUsd,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatPriceByPrv = format.formatAmount({
        humanAmount: this.pricePrv,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatAmount = format.amountVer2({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
      });

      const formatAmountNoClip = format.formatAmount({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
        decimalDigits: true,
        clipAmount: false,
      });

      const formatBalanceByUsd = format.amountVer2({
        originalAmount: convert.toOriginalAmount({
          humanAmount: new BigNumber(convert.toString({ text: formatAmount.toString() }))
            .multipliedBy(convert.toString({ text: formatPriceByUsd }))
            .toString(),
          decimals: this.pDecimals,
        }),
        decimals: this.pDecimals,
      });
      this.formatPriceByUsd = formatPriceByUsd;
      this.formatPriceByPrv = formatPriceByPrv;
      this.formatAmount = formatAmount;
      this.formatAmountNoClip = formatAmountNoClip;
      this.formatBalanceByUsd = formatBalanceByUsd;
    }
  }

  getIconUrl({ url }: { url: string }) {
    if (this.tokenId === PRVIDSTR) {
      return 'https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png';
    }
    if (this.isMainCrypto || this.isPToken) {
      const formatedSymbol = String(this.symbol || this.externalSymbol).toUpperCase();
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
}

export default SelectedPrivacy;
