import { Row } from 'antd';
import maxBy from 'lodash/maxBy';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';
import { poolsSelectors } from 'state/pools';
import styled from 'styled-components/macro';

import ArrowLeftImg from './arrow-left.png';

const Styled = styled.div`
  color: red;
  height: 50px;
  margin-top: -55px;
  margin-bottom: 80px;
  background-color: ${({ theme }) => theme.bg1};
  display: flex;
  justify-content: center;
  align-items: center;
  .text1 {
    color: white;
  }
  .text2 {
    margin-left: 16px;
    color: #0ecb81;
    cursor: pointer;
    font-weight: 500;
  }
  img {
    cursor: pointer;
    width: 13px;
    height: 12px;
    margin-left: 8px;
  }
  .row {
    align-items: center;
    :hover {
      opacity: 0.8;
    }
  }
`;
const MarketTitleBox = () => {
  const history = useHistory();
  const listPool = useSelector(poolsSelectors);
  const higherAPYPool = maxBy(listPool || [], 'apy');
  return (
    <Styled>
      <p className="h8 text1">Become a liquidity provider and earn up to {higherAPYPool?.apy || ''}% APY.</p>
      <Row
        className="row"
        onClick={() => {
          updateMetric({
            metric: METRIC_TYPE.SWAP_PROVIDE_LIQUIDITY,
            uniqMetric: METRIC_UNIQ.SWAP_PROVIDE_LIQUIDITY_UNIQ,
          });
          history.push('/earnings');
        }}
      >
        <p className="h8 text2">Provide liquidity</p>
        <img src={ArrowLeftImg} alt="image" />
      </Row>
    </Styled>
  );
};

export default React.memo(MarketTitleBox);
