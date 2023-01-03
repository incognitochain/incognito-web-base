import { AxiosInstance } from 'axios';
import { API_COIN_SERVICE, API_SERVICE } from 'config';
import { PRIVATE_TOKEN_CURRENCY_TYPE, PRV } from 'constants/token';
import PTokenModel from 'models/model/pTokenModel';
import { unshieldFeeBuilder } from 'models/unshield.utils';
import { IRespEstSwap } from 'pages/Swap/features/FormUnshield/FormUnshield.inteface';
import { SwapExchange } from 'pages/Swap/features/FormUnshield/FormUnshield.types';
import { combineSwapTxs } from 'pages/Swap/features/SwapTxs/SwapTxs.utils';
import { getSwapTxs, ISwapTxStorage } from 'pages/Swap/Swap.storage';
import createAxiosInstance, { CANCEL_KEY } from 'services/axios';

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
  shardIDStr: string;
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
  feeAddressShardID?: number;
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

  async estimateUnshieldWithAddress({
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
  // tokenID = parent tokenID
  async estimateUnshieldWithoutAddress({
    network,
    amount,
    tokenID,
    isUnified,
  }: {
    network: string;
    amount: number;
    tokenID: string;
    isUnified: boolean;
  }): Promise<IUserFee | undefined> {
    const endpoint = `unshield/estimatefee?network=${network}&amount=${amount}&tokenid=${tokenID}`;
    let data: any = await this.http.get(endpoint);
    const estimateData = isUnified
      ? {
          BurntAmount: data?.burntAmount,
          ExpectedAmount: data?.expectedReceive,
          Fee: data?.protocolFee,
        }
      : {};
    const fee = { Level1: data?.feeAmount };
    const mappingData = {
      EstimateReceivedAmount: estimateData,
      FeeAddress: data?.feeAddress,
      [tokenID !== PRV.id ? 'TokenFees' : 'PrivacyFees']: fee,
      FeeAddressShardID: data?.feeAddressShardID,
    };
    return unshieldFeeBuilder(mappingData);
  }

  async estimateSwapFee({
    network,
    amount,
    fromToken,
    toToken,
    slippage,
    shardIDStr,
  }: ISwapFeePayload): Promise<IRespEstSwap> {
    const data: any = await this.http.post(`papps/estimateswapfee?${CANCEL_KEY}`, {
      Network: network,
      Amount: amount,
      FromToken: fromToken,
      ToToken: toToken,
      Slippage: slippage,
      ShardID: shardIDStr,
    });
    return data?.Networks;
  }

  submitUnshieldTx(payload: { txID: string; paymentAddr: string }) {
    return this.http.post('submitunshieldtx', {
      IncognitoTx: payload.txID,
      WalletAddress: payload.paymentAddr,
    });
  }

  submitUnshieldCentralizedTx(payload: {
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

  submitUnshieldDecentralizedTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }) {
    return this.http.post('unshield/submittx', {
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  submitSwapPdex({
    txHash,
    tokenIDSell,
    tokenIDBuy,
    amountIn,
    amountOut,
  }: {
    txHash: string;
    tokenIDSell: string;
    tokenIDBuy: string;
    amountIn: string;
    amountOut: string;
  }) {
    return this.http.post('dexswap', {
      txhash: txHash,
      token_sell: tokenIDSell,
      token_buy: tokenIDBuy,
      amount_in: amountIn,
      amount_out: amountOut,
    });
  }

  submitSwapTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }) {
    return this.http.post('papps/submitswaptx', {
      // TxHash: txHash,
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  submitInterSwapTx({
    txRaw,
    txHash,
    sellTokenID,
    midTokenID,
    buyTokenID,
    amountOutRaw,
    slippage,
    pAppName,
    pAppNetwork,
    refundFeeOTA,
    refundOTA,
    sellTokenOTA,
    buyTokenOTA,
    inputAddress,
    shardID,
  }: {
    txRaw: string;
    txHash: string;
    sellTokenID: string;
    midTokenID: string;
    buyTokenID: string;
    amountOutRaw: number;
    slippage: string;
    pAppName: string;
    pAppNetwork: string;
    refundFeeOTA: string;
    refundOTA: string;
    sellTokenOTA: string;
    buyTokenOTA: string;
    inputAddress?: string;
    shardID: number;
  }) {
    return this.http.post('papps/submitinterswaptx', {
      TxHash: txHash,
      TxRaw: txRaw,
      FromToken: sellTokenID,
      MidToken: midTokenID,
      ToToken: buyTokenID,
      FinalMinExpectedAmt: amountOutRaw,
      Slippage: slippage,
      PAppName: pAppName,
      PAppNetwork: pAppNetwork,
      OTARefundFee: refundFeeOTA,
      OTARefund: refundOTA,
      OTAFromToken: sellTokenOTA,
      OTAToToken: buyTokenOTA,
      WithdrawAddress: inputAddress,
      ShardID: `${shardID}`,
    });
  }

  async apiGetSwapTxs() {
    const localTxs: ISwapTxStorage[] = (getSwapTxs() || []).reverse().slice(0, 20);
    if (!localTxs || localTxs.length === 0) return [];

    // swapTxID backend swap service
    const swapTxIDs: string[] = [];
    const swapInterTxIDs = [];
    for (const localTx of localTxs) {
      const isInter = localTx?.appName === SwapExchange.INTER_SWAP;
      if (localTx.txHash) {
        if (isInter) {
          swapInterTxIDs.push(localTx.txHash);
        } else {
          swapTxIDs.push(localTx.txHash);
        }
      }
    }

    const openseaIDs = localTxs.filter((tx) => tx.sellTokenID === undefined).map((tx) => tx.txHash);

    const [swapTxs, swapInterTxs, openseaTxs] = await Promise.all([
      (await this.http.post('papps/swapstatus', {
        TxList: swapTxIDs,
      })) || [],
      (await this.http.post('papps/interswapstatus', {
        TxList: swapInterTxIDs,
      })) || [],
      (await this.http.post('papps/opensea/buystatus', {
        TxList: openseaIDs,
      })) || [],
    ]);
    return combineSwapTxs({ localTxs, swapTxs: { ...swapTxs, ...openseaTxs, ...swapInterTxs } });
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

const getPools = async (): Promise<any> => {
  const response = await fetch(`${API_COIN_SERVICE}/pdex/v3/listpools?pair=all&verify=true`);
  const data = await response.json();
  return data?.Result;
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

export { genDepositAddress, getPools, getTokenListNoCache, getVaults, submitDepositTx };
export default rpcClient;
