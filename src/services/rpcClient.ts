import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import { getSwapTxs, ISwapTxStorage } from 'pages/Swap/Swap.storage';
import createAxiosInstance from 'services/axios';

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
}

interface ISwapFeePayload {
  network: string;
  amount: string;
  fromToken: string;
  toToken: string;
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
}

export interface IDepositAddress {
  address: string;
  estimateFee: number;
  tokenFee?: number;
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
  }: IUserFeePayload): Promise<IUserFee | undefined> {
    const addressType = 2;
    const data: any = await this.http.post('genunshieldaddress', {
      Network: network,
      RequestedAmount: requestedAmount,
      AddressType: addressType,
      IncognitoAmount: incognitoAmount,
      PaymentAddress: paymentAddress,
      PrivacyTokenAddress: privacyTokenAddress,
      WalletAddress: walletAddress,
      UnifiedTokenID: unifiedTokenID,
    });
    const feeType = data?.TokenFees ? data.TokenFees : data.PrivacyFees;
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
      id: data.ID,
      isUseTokenFee: !!data?.TokenFees,
      estimateFee,
      estimatedBurnAmount,
      estimatedExpectedAmount,
    };
  }

  async estimateSwapFee({ network, amount, fromToken, toToken }: ISwapFeePayload): Promise<any> {
    const data: any = await this.http.post('papps/estimateswapfee', {
      Network: network,
      Amount: amount,
      FromToken: fromToken,
      ToToken: toToken,
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

  submitSwapTx({ txHash, txRaw }: { txHash: string; txRaw: string }) {
    return this.http.post('papps/submitswaptx', {
      TxHash: txHash,
      TxRaw: txRaw,
    });
  }

  async apiGetSwapTxs() {
    const swapTxs: ISwapTxStorage[] = (getSwapTxs() || []).reverse();
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
  }: {
    network: string;
    incAddress: string;
    tokenID: string;
  }): Promise<IDepositAddress> {
    const resp: any = await this.http.post('genshieldaddress', {
      Network: network,
      AddressType: 1,
      WalletAddress: incAddress,
      PrivacyTokenAddress: tokenID,
    });
    return {
      address: resp.Address,
      estimateFee: resp.EstimateFee,
      tokenFee: resp.TokenFee,
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
}: {
  network: string;
  incAddress: string;
  tokenID: string;
}): Promise<IDepositAddress> => {
  return rpcClient.genDepositAddress({
    network,
    incAddress,
    tokenID,
  });
};

export { genDepositAddress, getTokenListNoCache, getVaults, submitDepositTx };
export default rpcClient;
