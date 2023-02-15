import { BigNumber } from 'bignumber.js';
import { METRIC_UNIQ } from 'services/rpcMetric';

const Storage = {
  KEY: {
    UNIQ_METRIC: 'UNIQ_METRIC',
  },

  setItem(key: string, value: any) {
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },

  getItem(key: string): any {
    try {
      let data = localStorage.getItem(key);
      console.log('getItem data: ', data);

      if (data && this.isJsonString(data)) {
        data = JSON.parse(data);
      }
      return data;
    } catch (error) {
      console.log('getItem error: ', error);
    }
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
};

// Count last state in 24h
export const checkUpdateMetricUniq = async ({ type }: { type: METRIC_UNIQ }) => {
  let shouldUpdate = true;
  try {
    // const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).getTime();
    const now = new Date().getTime();
    const KEY = Storage.KEY.UNIQ_METRIC + type;
    const values = Object.values(METRIC_UNIQ);
    if (values.includes(type)) {
      const lastTimeUpdate = await Storage.getItem(KEY);
      /** handle check valid update */
      if (!lastTimeUpdate || new BigNumber(lastTimeUpdate || 0).gte(endOfDay)) {
        await Storage.setItem(KEY, now);
        shouldUpdate = true;
      } else {
        shouldUpdate = false;
      }
    }
  } catch (e) {
    // handle error here
    console.log('CHECK UPDATE METRIC WITH ERROR: ', e);
  }
  return shouldUpdate;
};

export default Storage;
