import { AxiosInstance } from 'axios';
import { ICollection, mapperCollections } from 'pages/Blur';
import createAxiosInstance, { CANCEL_KEY } from 'services/axios';

class RpcPBlur {
  http: AxiosInstance;

  constructor() {
    this.http = createAxiosInstance({ baseURL: 'https://core-api.prod.blur.io/' });
  }

  async getCollections(): Promise<ICollection[]> {
    return this.http.get(`v1/collections?${CANCEL_KEY}`).then((resp: any) => mapperCollections(resp.collections));
  }
}

const rpcPBlur = new RpcPBlur();

export default rpcPBlur;
