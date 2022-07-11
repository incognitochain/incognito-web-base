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

  submitDepositTxHash({ hash, chainID, tokenID }: { hash: string; chainID: number; tokenID: string }) {
    return this.http.post('submitshieldtx', {
      Txhash: hash,
      Network: chainID,
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
  chainID,
  tokenID,
}: {
  hash: string;
  chainID: number;
  tokenID: string;
}): Promise<any> => {
  return rpcClient.submitDepositTxHash({
    hash,
    chainID,
    tokenID,
  });
};

export { getTokenListNoCache, submitDepositTx };
export default rpcClient;
