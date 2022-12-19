import { Col } from 'antd';
import { PRVIcon } from 'components/icons';
import React, { memo } from 'react';

import Analytics from './GetPRV.analytics';
import { Container, Content, Header } from './GetPRV.styled';

const GetPRV = () => {
  return (
    <Container className="default-max-width">
      <Header>
        <Col>
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
      </Content>
    </Container>
  );
};

export default memo(GetPRV);
