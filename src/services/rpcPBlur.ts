import { AxiosInstance } from 'axios';
import createAxiosInstance from 'services/axios';

const DEFAULT_LIMIT = 1000;

class RpcPBlur {
  http: AxiosInstance;

  constructor() {
    this.http = createAxiosInstance({ baseURL: 'https://core-api.prod.blur.io/' });
  }

  async getCollections() {
    try {
      const data = await this.http.get('v1/collections');
      console.log('SANG TEST: ', data);
    } catch (e) {
      console.log('SANG TEST: ERROR: ', e);
    }
  }
}

const rpcPBlur = new RpcPBlur();

export default rpcPBlur;
