import { AxiosInstance } from 'axios';
import { isMainnet } from 'config';
import { checkUpdateMetricUniq } from 'metric';
import createAxiosInstance from 'services/axios';

export enum METRIC_TYPE {
  OPEN = 81,
  CONFIRM_DEPOSIT = 82,
  CONFIRM_SWAP = 83,
  RESUBMIT_DEPOSIT = 84,
  RESUBMIT_SWAP = 85,
  ESTIMATE_SWAP = 86,
  CONFIRM_UNSHIELD = 87,

  HOME_GET_PRV = 200,
  HOME_WATCH_FILM = 201,

  HOME_SWAP = 202,
  HOME_MINE = 203,
  HOME_PAPPS = 204,
  HOME_APP_GET_PRV = 206,

  HEADER_SWAP = 300,
  HEADER_MINE = 301,
  HEADER_PAPPS = 302,
  HEADER_PRV = 303,
  HEADER_INSCRIPTION = 304,

  MINE_OVERVIEW = 400,
  MINE_PNODE = 401,
  MINE_VNODE = 402,
  MINE_EXPLORER = 403,
  MINE_HOW_STAKE = 404,
  MINE_BUY_PRV = 405,
  MINE_BECOME_VALIDATOR = 406,
  GETPRV_GET_PRV = 407,
  MINE_BUY_PNODE = 408,
  SWAP_PROVIDE_LIQUIDITY = 409,
  EARN_SELECT = 410,
  EARN_NOW = 411,
  EARN_MORE_DETAIL = 412,

  PAPP_PANCAKE = 413,
  PAPP_UNISWAP = 414,
  PAPP_CURVE = 415,
  PAPP_SPOOKY = 416,
  PAPP_TRADER_JOE = 417,
  PAPP_TRISOLARIS = 418,
  PAPP_OPENSEA = 419,
  PAPP_DEVELOPER = 420,
}

export enum METRIC_UNIQ {
  HOME_GET_PRV_UNIQ = 100,
  HOME_WATCH_FILM_UNIQ = 101,

  HOME_SWAP_UNIQ = 102,
  HOME_MINE_UNIQ = 103,
  HOME_PAPPS_UNIQ = 104,
  HOME_APP_GET_PRV_UNIQ = 105,

  HEADER_SWAP_UNIQ = 400,
  HEADER_MINE_UNIQ = 401,
  HEADER_PAPPS_UNIQ = 402,
  HEADER_INSCRIPTION_UNIQ = 403,

  HEADER_PRV_UNIQ = 303,

  MINE_OVERVIEW_UNIQ = 500,
  MINE_PNODE_UNIQ = 501,
  MINE_VNODE_UNIQ = 502,
  MINE_EXPLORER_UNIQ = 503,
  MINE_HOW_STAKE_UNIQ = 504,
  MINE_BUY_PRV_UNIQ = 505,
  MINE_BECOME_VALIDATOR_UNIQ = 506,
  GETPRV_GET_PRV_UNIQ = 507,
  MINE_BUY_PNODE_UNIQ = 508,

  SWAP_PROVIDE_LIQUIDITY_UNIQ = 509,
  EARN_SELECT_UNIQ = 510,
  EARN_NOW_UNIQ = 511,
  EARN_MORE_DETAIL_UNIQ = 512,

  PAPP_PANCAKE_UNIQ = 513,
  PAPP_UNISWAP_UNIQ = 514,
  PAPP_CURVE_UNIQ = 515,
  PAPP_SPOOKY_UNIQ = 516,
  PAPP_TRADER_JOE_UNIQ = 517,
  PAPP_TRISOLARIS = 518,
  PAPP_OPENSEA_UNIQ = 519,
  PAPP_DEVELOPER_UNIQ = 520,
}

class RpcMetric {
  http: AxiosInstance;
  constructor() {
    const url = 'https://churn-api-coinservice.incognito.org/';
    this.http = createAxiosInstance({ baseURL: url });
  }

  async updateMetric({ type }: { type: METRIC_TYPE | METRIC_UNIQ | any }) {
    const test_domains = ['app-staging.incognito.org', 'app-devtest.incognito.org'];
    if (!isMainnet || test_domains.some((domain) => window.location.href.includes(domain))) return;
    const shouldUpdate = await checkUpdateMetricUniq({ type });
    if (!shouldUpdate) return;
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

export const updateMetric = ({ metric, uniqMetric }: { metric: METRIC_TYPE; uniqMetric: METRIC_UNIQ }) => {
  rpcMetric.updateMetric({ type: metric }).then();
  rpcMetric.updateMetric({ type: uniqMetric }).then();
};

export default rpcMetric;
