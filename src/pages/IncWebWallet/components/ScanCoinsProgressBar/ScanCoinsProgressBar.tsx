import { PRV_ID } from 'pages/IncWebWallet/constants/common';
import React from 'react';
import { StorageManager } from 'storage';
import format from 'utils/format';
import JSONHelper from 'utils/jsonHelper';

import Styled from './ScanCoinsProgressBar.style';

interface ScanCoinsProgressBarProps {
  className?: string;
}

let updateTimer: any = undefined;
const INTERVAL_TIME_UPDATE_PROGRESS = 5000;
export const COINS_INDEX_STORAGE_KEY = 'COINS_INDEX_STORAGE_KEY';

export const ScanCoinsProgressBar = (props: ScanCoinsProgressBarProps) => {
  const { className } = props;
  const [percent, setPercent] = React.useState(0);
  const getPercentScan = async () => {
    const data = StorageManager.getItem(COINS_INDEX_STORAGE_KEY);
    try {
      if (data) {
        const result = JSONHelper.isJsonString(data) && JSON.parse(data);
        const { coinsLen, prvLen, tokenID, batchStart } = result;
        const index = tokenID === PRV_ID ? batchStart : batchStart + prvLen;
        const percent = format.toFixed({
          number: Number(index / coinsLen) * 100,
          decimals: 2,
        });
        setPercent(Number(percent));
      }
    } catch (error) {
      console.log('[getPercentScan] error ', {
        error,
      });
    }
  };
  const handlePercent = async () => {
    await getPercentScan();
    if (!updateTimer) {
      updateTimer = setInterval(async () => {
        await getPercentScan();
      }, INTERVAL_TIME_UPDATE_PROGRESS);
    }
  };

  React.useEffect(() => {
    handlePercent().then();
    return () => {
      updateTimer = undefined;
      clearInterval(updateTimer);
    };
  }, []);

  return (
    <Styled className={`hover disable-pointer ${className || ''}`}>
      <p className="fs-small fw-medium">Syncing {percent}%</p>
    </Styled>
  );
};
