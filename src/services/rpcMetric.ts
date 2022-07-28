import { AxiosInstance } from 'axios';
import createAxiosInstance from 'services/axios';

import { isMainnet } from '../config';

export enum METRIC_TYPE {
  OPEN = 81,
  CONFIRM_DEPOSIT = 82,
  CONFIRM_SWAP = 83,
  RESUBMIT_DEPOSIT = 84,
  RESUBMIT_SWAP = 85,
}

class RpcMetric {
  http: AxiosInstance;
  constructor() {
    const url = 'https://churn-api-coinservice.incognito.org/';
    this.http = createAxiosInstance({ baseURL: url });
  }

  async updateMetric({ type }: { type: METRIC_TYPE }) {
    if (!isMainnet) return;
    try {
      const now = Math.round(new Date().getTime() / 1000);
      await this.http.post('churn', {
        created_at: now,
        type_id: type,
      });
    } catch (e) {
      console.log('UPDATE METRIC WITH ERROR: ', e);
    }
  }
}

const rpcMetric = new RpcMetric();
export default rpcMetric;
