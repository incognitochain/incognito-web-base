import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import PTokenModel from 'models/model/pTokenModel';
import createAxiosInstance from 'services/axios';

class RpcClient {
  http: AxiosInstance;
  constructor() {
    // const url = 'http://51.161.117.193:9898/';
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getTokens() {
    return this.http.get('coins/tokenlist');
  }
}

const rpcClient = new RpcClient();

const getTokenListNoCache = async (): Promise<PTokenModel[]> => {
  const tokens: PTokenModel[] =
    (await rpcClient.getTokens().then((res: any) => res.map((token: any) => new PTokenModel(token)))) || [];
  return tokens.filter(({ tokenID }) => !!tokenID);
};

export { getTokenListNoCache };
export default rpcClient;
