import { BigNumber } from 'bignumber.js';
import { METRIC_UNIQ } from 'services/rpcMetric';
import { KEYS, StorageManager } from 'storage';

// Count last state in 24h
const checkUpdateMetricUniq = async ({ type }: { type: METRIC_UNIQ }) => {
  let shouldUpdate = true;
  try {
    // const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).getTime();
    const now = new Date().getTime();
    const key = KEYS.UNIQ_METRIC + type;
    const values = Object.values(METRIC_UNIQ);
    if (values.includes(type)) {
      const lastTimeUpdate = await StorageManager.getItem(key);
      /** handle check valid update */
      if (!lastTimeUpdate || new BigNumber(lastTimeUpdate || 0).gte(endOfDay)) {
        await StorageManager.setItem(key, now);
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

export { checkUpdateMetricUniq };
