import { Col } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { PRVIcon } from 'components/icons';
import { BIG_COINS, MAIN_NETWORK_NAME, PRV } from 'constants/token';
import { useWindowSize } from 'hooks/useWindowSize';
import { actionSetSwapNetwork } from 'pages/Swap/features/FormUnshield/FormUnshield.actions';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';
import { useAppDispatch } from 'state/hooks';

import { FOOTER_ID, HEADER_ID } from '../App';
import Analytics from './GetPRV.analytics';
import Promote from './GetPRV.promote';
import { Container, Content, Header, WrapChart } from './GetPRV.styled';
import PieImg from './images/pie.png';
import RewardImg from './images/reward.png';

const GetPRV = () => {
  const { width, height } = useWindowSize();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [contentSize, setContentSize] = React.useState(height || 0);

  const getContentSize = () => {
    let contentSize = 0;
    const header = document.getElementById(HEADER_ID);
    const footer = document.getElementById(FOOTER_ID);
    if (height && header && footer) {
      const headerHeight = header.clientHeight;
      // const footerHeight = footer.clientHeight;
      const footerHeight = 0;
      contentSize = height - headerHeight - footerHeight - 35;
    }
    setContentSize(contentSize);
  };

  React.useEffect(() => {
    getContentSize();
  }, [width, height]);

  return (
    <Container className="default-max-width" height={contentSize}>
      <Header>
        <Col className="col-1">
          <Col>
            {/*<h3>Privacy (PRV)</h3>*/}
            {/*<p className="sub-header h7">*/}
            {/*  PRV is the native cryptocurrency of Incognito. Holders will shape the future of Incognito by signaling*/}
            {/*  their support for upgrades to the ecosystem and directing usage of a Community Treasury.*/}
            {/*</p>*/}
            <h3>What is PRV?</h3>
            <p className="sub-header h7">
              Privacy (PRV) is used it to participate in privacy markets, use your favorite apps privately, stake it to
              earn block rewards, and govern the network.
              {/*<a*/}
              {/*  href="https://we.incognito.org/t/network-incentive-privacy-prv-mining-distribution/172"*/}
              {/*  target="_blank"*/}
              {/*  rel="noreferrer"*/}
              {/*>*/}
              {/*  More on PRV economics*/}
              {/*</a>*/}
            </p>
            <ButtonConfirmed
              className="btn-get-prv"
              onClick={() => {
                dispatch(actionSetSwapNetwork(MAIN_NETWORK_NAME.INCOGNITO));
                updateMetric({ metric: METRIC_TYPE.GETPRV_GET_PRV, uniqMetric: METRIC_UNIQ.GETPRV_GET_PRV_UNIQ });
                history.push('/swap', { tokenId1: BIG_COINS.USDT_UNIFIED.tokenID, tokenId2: PRV.id });
              }}
            >
              Buy PRV
            </ButtonConfirmed>
          </Col>
        </Col>
        <PRVIcon />
      </Header>
      <Promote />
      <Content>
        {/*<h3>What is PRV?</h3>
        <p className="h7">
          Privacy (PRV) is used it to participate in privacy markets, use your favorite apps privately, stake it to earn
          block rewards, and govern the network. PRV is minted for every new block mined, and has a fixed maximum supply
          of 100M.{`\n`}
          <a
            href="https://we.incognito.org/t/network-incentive-privacy-prv-mining-distribution/172"
            target="_blank"
            rel="noreferrer"
          >
            More on PRV economics
          </a>
        </p>*/}
        <Analytics />
      </Content>
      <WrapChart>
        <div>
          <p className="head-pie">Allocation</p>
          <img className="pie-img" src={PieImg} />
        </div>
        <div>
          <p className="head-reward">PRV Block Rewards</p>
          <img className="reward-img" src={RewardImg} />
        </div>
      </WrapChart>
    </Container>
  );
};

export default memo(GetPRV);
