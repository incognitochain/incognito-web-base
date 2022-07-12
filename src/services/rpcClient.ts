import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import createAxiosInstance from 'services/axios';

class RpcClient {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getTokens() {
    return this.http.get('tokenlist');
  }

  submitDepositTxHash({ hash, networkID, tokenID }: { hash: string; networkID: number; tokenID: string }) {
    return this.http.post('submitshieldtx', {
      Txhash: hash,
      Network: networkID,
      TokenID: tokenID,
    });
  }
}

const rpcClient = new RpcClient();

const getTokenListNoCache = async (): Promise<PTokenModel[]> => {
  const tokens: PTokenModel[] =
    (await rpcClient.getTokens().then((res: any) => res.map((token: any) => new PTokenModel(token)))) || [];
  return tokens.filter(({ tokenID }) => !!tokenID);
};

const submitDepositTx = async ({
  hash,
  networkID,
  tokenID,
}: {
  hash: string;
  networkID: number;
  tokenID: string;
}): Promise<any> => {
  return rpcClient.submitDepositTxHash({
    hash,
    networkID,
    tokenID,
  });
};

export { getTokenListNoCache, submitDepositTx };
export default rpcClient;
