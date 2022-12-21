import { Col } from 'antd';
import { PRVIcon } from 'components/icons';
import React, { memo } from 'react';

import { useWindowSize } from '../../hooks/useWindowSize';
import { FOOTER_ID, HEADER_ID } from '../App';
import Analytics from './GetPRV.analytics';
import Promote from './GetPRV.promote';
import { Container, Content, Header } from './GetPRV.styled';

const GetPRV = () => {
  const { width, height } = useWindowSize();

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
            <h3>Get PRV</h3>
            <p className="sub-header h8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
              to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
          </Col>
        </Col>
        <PRVIcon />
      </Header>
      <Analytics />
      <Content>
        <h3>What is PRV</h3>
        <p className="h7">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
          dummy text ever since the 1500s
        </p>
        <Promote />
      </Content>
    </Container>
  );
};

export default memo(GetPRV);
