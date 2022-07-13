import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import createAxiosInstance from 'services/axios';

interface ISummitEtherHash {
  hash: string;
  networkID: number;
  tokenID: string;
}

interface IUserFeePayload {
  network: string; // eth, bsc, plg, ftm”: (= ethereum, binance smart chain, polygon, fantom)
  requestedAmount: string; // amount with decimal.
  incognitoAmount: string;
  paymentAddress: string;
  privacyTokenAddress: string;
  walletAddress: string; // for history.
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
}

class RpcClient {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getTokens() {
    return this.http.get('tokenlist');
  }

  submitDepositTxHash({ hash, networkID, tokenID }: ISummitEtherHash) {
    return this.http.post('submitshieldtx', {
      Txhash: hash,
      Network: networkID,
      TokenID: tokenID,
    });
  }

  async estimateFee({
    network,
    requestedAmount,
    incognitoAmount,
    paymentAddress,
    privacyTokenAddress,
    walletAddress,
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
    });
    const feeType = data?.TokenFees ? data.TokenFees : data.PrivacyFees;
    const fee: IFee = {
      level1: feeType.Level1,
      level2: feeType.Level2,
    };
    return {
      fee,
      feeAddress: data.FeeAddress,
      id: data.ID,
      isUseTokenFee: !!data?.TokenFees,
    };
  }
}

const rpcClient = new RpcClient();

const getTokenListNoCache = async (): Promise<PTokenModel[]> => {
  const tokens: PTokenModel[] =
    (await rpcClient.getTokens().then((res: any) => res.map((token: any) => new PTokenModel(token)))) || [];
  return tokens.filter(({ tokenID }) => !!tokenID);
};

const submitDepositTx = async ({ hash, networkID, tokenID }: ISummitEtherHash): Promise<any> => {
  return rpcClient.submitDepositTxHash({
    hash,
    networkID,
    tokenID,
  });
};

export { getTokenListNoCache, submitDepositTx };
export default rpcClient;
