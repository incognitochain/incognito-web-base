import { AxiosInstance } from 'axios';
import createAxiosInstance from 'services/axios';

class RpcTxService {
  http: AxiosInstance;
  constructor() {
    const url = 'https://api-coinservice-staging.incognito.org/txservice/';
    this.http = createAxiosInstance({ baseURL: url });
  }

  async sendRawTx(rawTx: string) {
    try {
      return this.http.post('pushtx', { TxRaw: rawTx });
    } catch (e) {
      console.log('PUSH TX ERROR: ', e);
    }
  }
}

const rpcTxService = new RpcTxService();
export default rpcTxService;
