import { Button } from 'antd';
import { memo } from 'react';
import styled from 'styled-components/macro';

import ListPoolTable from './components/ListPoolTable';

export const Styled = styled.div`
  flex: 1;
  width: 100%;
  text-align: center;
  .row-button {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .more-detail-title {
      color: #ffffff;
      margin-left: 32px;
      cursor: pointer;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
    }
    .earn-button {
      width: 128px;
      height: 60px;
      background: #1a73e8;
      border-radius: 8px;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
    }
  }
`;

const Earnings = () => {
  return (
    <Styled>
      <div className="default-padding-horizontal default-margin-top">
        <h1>Become a Liquidity Provider for DEX</h1>
        <div className="row-button">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="earn-button"
            onClick={() => {
              window.open('https://we.incognito.org/t/how-to-contribute-liquidity-and-earn-rewards/15254', '_blank');
            }}
          >
            {'Earn now'}
          </Button>

          <button
            onClick={() => {
              window.open('https://we.incognito.org/t/incognito-exchange-liquidity-mining/16083', '_blank');
            }}
          >
            <p className="more-detail-title description3 hover-opacity">More details</p>
          </button>
        </div>
        <ListPoolTable />
      </div>
    </Styled>
  );
};

export default memo(Earnings);
