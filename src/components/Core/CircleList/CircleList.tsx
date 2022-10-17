import { Card, Col, List, Row } from 'antd';
import React from 'react';
import { isMobile } from 'react-device-detect';
import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 76px;
  padding-top: 10px;

  .circle-title {
    font-size: 62px;
    line-height: 70px;
    white-space: pre-wrap;
    text-align: center;
  }
  .circle-margin-right ~ .circle-margin-right {
    margin-left: 24px;
  }

  .circle-wrap {
    margin-top: 70px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        padding-bottom: 32px;
        padding-top: 0px;
        .ant-list {
          margin-left: 0px !important;
        }
        .ant-card-body {
          padding: 8px;
        }
        .last-item {
          width: 100vw;
        }
        .circle-wrap {
          margin-top: 40px;
        }
    `}
`;

const Item = styled.div`
  .circle-circle {
    width: 220px;
    height: 220px;
    border-radius: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background3};
    margin: auto;
  }
  .circle-item-title {
    font-size: 54px;
    line-height: 64px;
    margin-bottom: 0;
    text-align: center;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.text1};
  }
  .circle-item-sub-title {
    margin-top: 24px;
    font-size: 22px;
    color: ${({ theme }) => theme.text2};
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .circle-item-title {
            font-size: 24;
          }
          .circle-circle {
            width: 150px;
            height: 150px;
          }
          .circle-item-title {
            font-size: 34px;
            line-height: 44px;
          }
          .circle-item-sub-title {
            font-size: 16px;
          }
          .circle-item-sub-title {
            margin-top: 10px;
          }
    `}
`;

const CircleList = ({ data = [], grid = {} }: { data: any[]; grid: any }) => {
  const renderItem = (item: any, index: number) => (
    <Card style={{ minWidth: isMobile ? 0 : 320 }} className={index === 2 && isMobile ? 'last-item' : ''}>
      <Item className="circle-margin-right">
        <div className={`circle-circle`}>
          <p className="circle-item-title">{item.title}</p>
        </div>
        <p className="text-align-center fw-medium circle-item-sub-title">{item.content}</p>
      </Item>
    </Card>
  );
  return (
    <Styled className="background2">
      {/*<p className="circle-title">{marketTrs.privacyMarketplace}</p>*/}
      <Row className="circle-wrap">
        <Col xs={24}>
          <List grid={grid} style={{ marginLeft: isMobile ? 0 : 12 }} dataSource={data} renderItem={renderItem} />
        </Col>
      </Row>
    </Styled>
  );
};

export default React.memo(CircleList);
