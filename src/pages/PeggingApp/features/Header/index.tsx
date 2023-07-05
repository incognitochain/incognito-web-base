import React from 'react';
import styled from 'styled-components/macro';

import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from '../../../../services/rpcMetric';

const Styled = styled.div`
  min-height: 50px;
  margin-top: -55px;
  margin-bottom: 80px;
  background-color: ${({ theme }) => theme.bg1};
  justify-content: center;
  align-items: center;
  width: 100vw;
  line-break: auto;
  display: inline;
  text-align: center;
  .text1 {
    color: white !important;
    line-height: 50px;
  }
  .text2 {
    margin-left: 12px;
    color: ${({ theme }) => theme.btn1};
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
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    .text1 {
       line-height: 30px;
    }
  `};
`;

const Header = () => {
  return (
    <Styled>
      <p className="h8 text1">
        Build on the privacy layer of crypto.
        <span
          className="text2"
          onClick={() => {
            updateMetric({
              metric: METRIC_TYPE.PAPP_DEVELOPER,
              uniqMetric: METRIC_UNIQ.PAPP_DEVELOPER_UNIQ,
            });
            window.open('https://docs.incognito.org/docs/Developers/Tutorials/tutorial-puniswap', '_blank');
          }}
        >
          Build your privacy dApp →
        </span>
      </p>
    </Styled>
  );
};

export default React.memo(Header);
