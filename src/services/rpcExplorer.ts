import { AxiosInstance } from 'axios';
import createAxiosInstance from 'services/axios';

class RpcExplorer {
  http: AxiosInstance;
  constructor() {
    const url = 'https://api-explorer.incognito.org/';
    this.http = createAxiosInstance({ baseURL: url });
  }

  async getLandingValidatorData() {
    try {
      await this.http.get('api/v1/explorer/landing-validator-data');
    } catch (e) {
      console.log('UPDATE METRIC WITH ERROR: ', e);
    }
  }
}

const rpcExplorer = new RpcExplorer();
export default rpcExplorer;
