import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import { getSwapTxs, ISwapTxStorage } from 'pages/Swap/Swap.storage';
import createAxiosInstance from 'services/axios';

import { PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from '../constants';
import { combineSwapTxs } from '../pages/Swap/features/SwapTxs/SwapTxs.utils';

interface ISummitEtherHash {
  hash: string;
  networkID: number;
  captcha: string;
}

interface IUserFeePayload {
  network: string; // eth, bsc, plg, ftm”: (= ethereum, binance smart chain, polygon, fantom)
  requestedAmount: string; // amount with decimal.
  incognitoAmount: string;
  paymentAddress: string;
  privacyTokenAddress: string;
  walletAddress: string; // for history.
  unifiedTokenID: string;
  currencyType?: number;
}

interface ISwapFeePayload {
  network: string;
  amount: string;
  fromToken: string;
  toToken: string;
  slippage: string;
}

export interface IFee {
  level1: string;
  level2: string;
}

export interface IUserFee {
  feeAddress: string;
  id: number;
  fee: IFee;
  isUseTokenFee: boolean;
  estimateFee: number;
  estimatedBurnAmount: number;
  estimatedExpectedAmount: number;
  centralizedAddress?: string;
  minUnshield: number;
}

export interface IDepositAddress {
  address: string;
  estimateFee: number;
  tokenFee?: number;
  expiredAt?: string;
}

class RpcClient {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getTokens() {
    return this.http.get('tokenlist');
  }

  getSwapTokens() {
    return this.http.get('papps/getsupportedtokens');
  }

  getVaults() {
    return this.http.get('papps/getvaultstate');
  }

  submitDepositTxHash({ hash, networkID, captcha }: ISummitEtherHash) {
    return this.http.post('submitshieldtx', {
      Txhash: hash,
      Network: networkID,
      Captcha: captcha,
    });
  }

  async estimateFee({
    network,
    requestedAmount,
    incognitoAmount,
    paymentAddress,
    privacyTokenAddress,
    walletAddress,
    unifiedTokenID,
    currencyType,
  }: IUserFeePayload): Promise<IUserFee | undefined> {
    const addressType = 2;

    let payload = {};
    let endpoint = '';
    if (currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BTC) {
      payload = {
        Network: network,
      };
      endpoint = 'estimateunshieldfee';
    } else {
      endpoint = 'genunshieldaddress';
      payload = {
        Network: network,
        RequestedAmount: requestedAmount,
        AddressType: addressType,
        IncognitoAmount: incognitoAmount,
        PaymentAddress: paymentAddress,
        PrivacyTokenAddress: privacyTokenAddress,
        WalletAddress: walletAddress,
        UnifiedTokenID: unifiedTokenID,
        CurrencyType: currencyType,
      };
    }

    let data: any = await this.http.post(endpoint, payload);

    if (currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.BTC) {
      const { Fee, MinUnshield } = data;
      data = {
        Address: paymentAddress,
        Decentralized: 0,
        EstimateFee: 0,
        ExpiredAt: '',
        FeeAddress: '',
        ID: 0,
        TokenFee: 0,
        TokenFees: {
          Level1: Fee,
        },
        MinUnshield,
      };
    }
    let feeType = data?.TokenFees ? data.TokenFees : data.PrivacyFees;
    if (!feeType) {
      feeType = {
        Level1: '0',
      };
    }
    const fee: IFee = {
      level1: feeType.Level1,
      level2: feeType.Level2,
    };

    const estimateData = data.EstimateReceivedAmount || {};
    const estimateFee = estimateData?.Fee || 0;
    const estimatedBurnAmount = estimateData?.BurntAmount || 0;
    const estimatedExpectedAmount = estimateData?.ExpectedAmount || 0;

    return {
      fee,
      feeAddress: data.FeeAddress,
      centralizedAddress: data.Address,
      id: data.ID,
      isUseTokenFee: !!data?.TokenFees,
      estimateFee,
      estimatedBurnAmount,
      estimatedExpectedAmount,
      minUnshield: data?.MinUnshield || 0,
    };
  }

  async estimateSwapFee({ network, amount, fromToken, toToken, slippage }: ISwapFeePayload): Promise<any> {
    const data: any = await this.http.post('papps/estimateswapfee', {
      Network: network,
      Amount: amount,
      FromToken: fromToken,
      ToToken: toToken,
      Slippage: slippage,
    });
    const exchangeSupports = data?.Networks;
    return exchangeSupports;
  }

  submitUnshieldTx(payload: { txID: string; paymentAddr: string }) {
    return this.http.post('submitunshieldtx', {
      IncognitoTx: payload.txID,
      WalletAddress: payload.paymentAddr,
    });
  }

  submitUnshieldTx2(payload: {
    network: string;
    userFeeLevel: number;
    id: number;
    incognitoAmount: string;
    incognitoTx: string;
    paymentAddress: string;
    privacyTokenAddress: string;
    userFeeSelection: number;
    walletAddress: string;
    isUseTokenFee?: boolean;
    fee?: string;
    isDecentralized: boolean;
    centralizedAddress?: string;
    tokenID: string;
    erc20TokenAddress?: string; // unshield PRV
    currencyType: number; // unshield PRV
  }) {
    let _payload = {};
    if (payload.tokenID === PRV.id) {
      _payload = {
        Network: payload.network,
        CurrencyType: payload.currencyType,
        AddressType: 2,
        IncognitoAmount: payload.incognitoAmount,
        PaymentAddress: payload.paymentAddress,
        Erc20TokenAddress: payload.erc20TokenAddress,
        PrivacyTokenAddress: payload.privacyTokenAddress,
        IncognitoTx: payload.incognitoTx,
        WalletAddress: payload.walletAddress,
        ID: payload.id,
        UserFeeSelection: payload.userFeeSelection,
        UserFeeLevel: payload.userFeeLevel,
      };
    } else if (payload.isDecentralized) {
      _payload = {
        Network: payload.network,
        UserFeeLevel: payload.userFeeLevel,
        ID: payload.id,
        IncognitoAmount: payload.incognitoAmount,
        IncognitoTx: payload.incognitoTx,
        PaymentAddress: payload.paymentAddress,
        PrivacyTokenAddress: payload.privacyTokenAddress,
        UserFeeSelection: payload.userFeeSelection,
        WalletAddress: payload.walletAddress,
      };
    } else {
      _payload = {
        Network: payload.network,
        ID: payload.id,
        UserFeeLevel: payload.userFeeLevel,
        IncognitoTxToPayOutsideChainFee: payload.incognitoTx,
        Address: payload.centralizedAddress,
        PrivacyFee: payload.isUseTokenFee ? '0' : `${payload.fee || 0}`,
        TokenFee: payload.isUseTokenFee ? `${payload.fee || 0}` : '0',
        UserFeeSelection: payload.userFeeSelection,
      };
    }
    return this.http.post('submitunshieldtx', { ..._payload });
  }

  submitSwapTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }) {
    return this.http.post('papps/submitswaptx', {
      // TxHash: txHash,
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  async apiGetSwapTxs() {
    const swapTxs: ISwapTxStorage[] = (getSwapTxs() || []).reverse().slice(0, 20);
    let txIDs = [];
    if (!swapTxs || swapTxs.length === 0) return [];
    txIDs = swapTxs.map((tx) => tx.txHash);
    const txs =
      (await this.http.post('papps/swapstatus', {
        TxList: txIDs,
      })) || [];
    return combineSwapTxs({ localTxs: swapTxs, swapTxs: txs });
  }

  async genDepositAddress({
    network,
    incAddress,
    tokenID,
    currencyType,
    isBTC,
  }: {
    network: string;
    incAddress: string;
    tokenID: string;
    currencyType?: number;
    isBTC: boolean;
  }): Promise<IDepositAddress> {
    const resp: any = await this.http.post('genshieldaddress', {
      Network: network,
      AddressType: 1,
      WalletAddress: incAddress,
      PaymentAddress: incAddress,
      BTCIncAddress: incAddress,
      PrivacyTokenAddress: tokenID,
      CurrencyType: currencyType,
    });

    // Case bitcoin
    if (typeof resp === 'string' && isBTC) {
      return {
        address: resp,
        estimateFee: 0,
      };
    }
    // Case centralized & decentralized
    return {
      address: resp.Address,
      estimateFee: resp.EstimateFee,
      tokenFee: resp.TokenFee,
      expiredAt: resp.ExpiredAt,
    };
  }
}

const rpcClient = new RpcClient();

const getTokenListNoCache = async (): Promise<PTokenModel[]> => {
  const tokens: PTokenModel[] =
    (await rpcClient.getTokens().then((res: any) => res.map((token: any) => new PTokenModel(token)))) || [];
  return tokens.filter(({ tokenID }) => !!tokenID);
};

const getVaults = async (): Promise<any> => {
  const vaults = await rpcClient.getVaults();
  return vaults;
};

const submitDepositTx = async ({ hash, networkID, captcha }: ISummitEtherHash): Promise<any> => {
  return rpcClient.submitDepositTxHash({
    hash,
    networkID,
    captcha,
  });
};

const genDepositAddress = async ({
  network,
  incAddress,
  tokenID,
  currencyType,
  isBTC,
}: {
  network: string;
  incAddress: string;
  tokenID: string;
  currencyType?: number;
  isBTC: boolean;
}): Promise<IDepositAddress> => {
  return rpcClient.genDepositAddress({
    network,
    incAddress,
    tokenID,
    currencyType,
    isBTC,
  });
};

export { genDepositAddress, getTokenListNoCache, getVaults, submitDepositTx };
export default rpcClient;
