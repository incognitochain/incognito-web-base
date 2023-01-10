import { AxiosInstance } from 'axios';
import { ICollection, IResToken, mapperCollections, mapperResToken } from 'pages/Blur';
import createAxiosInstance, { CANCEL_KEY } from 'services/axios';

class RpcPBlur {
  http: AxiosInstance;

  constructor() {
    this.http = createAxiosInstance({ baseURL: 'https://core-api.prod.blur.io/' });
  }

  async getCollections(): Promise<ICollection[]> {
    return this.http.get(`v1/collections?${CANCEL_KEY}`).then((resp: any) => mapperCollections(resp.collections));
  }

  async getCollectionTokens(collectionName: string, cursor?: any): Promise<IResToken> {
    const params = {
      cursor,
      traits: [],
      hasAsks: true,
    };
    const paramString = JSON.stringify(params);

    return this.http
      .get(`v1/collections/${collectionName}/tokens?filters=${encodeURIComponent(paramString)}`)
      .then((resp: any) => mapperResToken(resp));
  }
}

const rpcPBlur = new RpcPBlur();

export default rpcPBlur;
