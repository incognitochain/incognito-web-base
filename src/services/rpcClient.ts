import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import createAxiosInstance from 'services/axios';

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

export { getTokenListNoCache, getVaults, submitDepositTx };
export default rpcClient;
