import { AxiosInstance } from 'axios';
import { ICollection, IResToken, mapperCollections, mapperResToken } from 'pages/Blur';
import createAxiosInstance, { CANCEL_KEY } from 'services/axios';

class RpcPBlur {
  http: AxiosInstance;

  constructor() {
    this.http = createAxiosInstance({ baseURL: 'http://51.161.117.193:7898/' });
  }

  async getCollections({ searchURL }: { searchURL?: string } = {}): Promise<ICollection[]> {
    return this.http.get(`papps/pblur/collections?${CANCEL_KEY}`).then((resp: any) => mapperCollections(resp));
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
