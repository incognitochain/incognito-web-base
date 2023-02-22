import { PRV_ID } from 'pages/IncWebWallet/constants/common';
import React from 'react';
import { StorageManager } from 'storage';
import styled from 'styled-components/macro';
import format from 'utils/format';
import JSONHelper from 'utils/jsonHelper';

interface ScanCoinsBarProps {
  className?: string;
}

export const COINS_INDEX_STORAGE_KEY = 'COINS_INDEX_STORAGE_KEY';

const Styled = styled.div`
  width: fit-content;
  height: 40px;
  background: #333335;
  border-radius: 8px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 2s;
  padding: 0 8px 0 8px;
  opacity: 0.9;
  min-width: 115px;
  margin-left: 8px;
`;

export const ScanCoinsBar = (props: ScanCoinsBarProps) => {
  const { className } = props;
  const [percent, setPercent] = React.useState(0);
  const getPercentScan = async () => {
    const data = StorageManager.getItem(COINS_INDEX_STORAGE_KEY);
    try {
      if (data) {
        const { coinsLen, prvLen, tokenID, batchStart } = JSONHelper.isJsonString(data) && JSON.parse(data);
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
    setInterval(async () => {
      await getPercentScan();
    }, 4000);
  };

  React.useEffect(() => {
    handlePercent().then();
  }, []);

  return (
    <Styled className={`hover disable-pointer ${className || ''}`}>
      <p className="fs-small fw-medium">Syncing {percent}%</p>
    </Styled>
  );
};
