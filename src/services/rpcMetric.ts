import { AxiosInstance } from 'axios';
import { isMainnet } from 'config';
import createAxiosInstance from 'services/axios';

export enum METRIC_TYPE {
  OPEN = 81,
  CONFIRM_DEPOSIT = 82,
  CONFIRM_SWAP = 83,
  RESUBMIT_DEPOSIT = 84,
  RESUBMIT_SWAP = 85,
  ESTIMATE_SWAP = 86,
}

class RpcMetric {
  http: AxiosInstance;
  constructor() {
    const url = 'https://churn-api-coinservice.incognito.org/';
    this.http = createAxiosInstance({ baseURL: url });
  }

  async updateMetric({ type }: { type: METRIC_TYPE }) {
    const test_domains = ['localhost:3000', 'app-staging.incognito.org', 'app-devtest.incognito.org'];
    if (!isMainnet || test_domains.some((domain) => window.location.href.includes(domain))) return;
    try {
      const now = Math.round(new Date().getTime() / 1000);
      await this.http.post('churn', {
        created_at: now,
        type_id: type,
        app: 'web-app',
      });
    } catch (e) {
      console.log('UPDATE METRIC WITH ERROR: ', e);
    }
  }
}

const rpcMetric = new RpcMetric();
export default rpcMetric;
