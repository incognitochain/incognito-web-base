import { Col, Row } from 'antd';
import { PRVIcon } from 'components/icons';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonConfirmed } from '../../components/Core/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import { FOOTER_ID, HEADER_ID } from '../App';
import Analytics from './GetPRV.analytics';
import Promote from './GetPRV.promote';
import { Container, Content, Header } from './GetPRV.styled';

const GetPRV = () => {
  const { width, height } = useWindowSize();
  const history = useHistory();

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
            <h3>Privacy (PRV)</h3>
            <p className="sub-header h8">
              PRV is the native cryptocurrency of Incognito. Holders will shape the future of Incognito by signaling
              their support for upgrades to the ecosystem and directing usage of a Community Treasury.
            </p>
          </Col>
          <Row>
            <ButtonConfirmed className="btn-get-prv" onClick={() => history.replace('/swap')}>
              Get PRV
            </ButtonConfirmed>
          </Row>
        </Col>
        <PRVIcon />
      </Header>
      <Analytics />
      <Content>
        <h3>What is PRV?</h3>
        <p className="h7">
          Privacy (PRV) is used it to participate in privacy markets, use your favorite apps privately, stake it to earn
          block rewards, and govern the network. PRV is minted for every new block mined, and has a fixed maximum supply
          of 100M.
        </p>
        <Promote />
      </Content>
    </Container>
  );
};

export default memo(GetPRV);
