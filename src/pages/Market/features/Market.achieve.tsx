import { Card, Col, List, Row } from 'antd';
import { marketTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { KEYS } from 'storage';
import { StorageManager } from 'storage';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .achieve-title {
    text-align: center;
  }
  .achieve-sub-title {
    text-align: center;
    margin-top: 24px;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
  }
  .achieve-margin-right ~ .achieve-margin-right {
    margin-left: 24px;
  }

  .achieve-wrap {
    width: 100%;
    max-width: 1260px;
  }
  .ant-card-body {
    padding: 0;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          padding-bottom: 40px;
          .achieve-sub-title {
              margin-top: 8px;
          }
          .ant-card-body {
            padding: 0px;
          }
          .achieve-wrap {
          }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          padding-bottom: 40px;
          .achieve-sub-title {
              margin-top: 8px;
          }
          .ant-card-body {
            padding: 0px;
          }
          .achieve-wrap {
          }
          .item-margin-top {
            margin-top: 24px;
          }
    `}
`;

const Item = styled.div`
  .achieve-circle {
    width: 240px;
    height: 240px;
    border-radius: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background3};
    margin: auto;
  }
  .achieve-item-title {
    font-weight: 700;
    font-size: 34px;
    line-height: 120%;
    margin-bottom: 0;
    color: ${({ theme }) => theme.text1};
  }
  .achieve-item-sub-title {
    margin-top: 24px;
    color: ${({ theme }) => theme.text2};
  }
  .wrap-item {
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        .achieve-circle {
            width: 200px;
            height: 200px;
            border-radius: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${({ theme }) => theme.background3};
            margin: auto;
        }
        .achieve-item-sub-title {
            line-height: 27px;
        }
    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .ant-card-body {
            padding: 0px;
          }
          .achieve-circle {
            width: 145px;
            height: 145px;
          }
          .achieve-item-sub-title {
            margin-top: 11px;
          }
    `}
`;

const MarketAchieve = () => {
  const marketTrs = useSelector(marketTranslateSelector);

  const Factory = React.useMemo(
    () => [
      {
        title: `${StorageManager.getItem(KEYS.TRADE_VOLUME) || 347}M`,
        content: marketTrs.volumeTraded,
        className: 'achieve-margin-right',
      },
      {
        title: '1M',
        content: marketTrs.anonymousTrades,
        className: 'achieve-margin-right',
      },
      {
        title: '200+',
        content: marketTrs.privateCryptocurrencies,
        className: 'achieve-margin-right item-margin-top',
      },
      {
        title: '13',
        content: marketTrs.bridgedBlockchains,
        className: 'item-margin-top',
      },
    ],
    [marketTrs]
  );

  const renderItem = (item: any) => (
    <Card style={{ minWidth: isMobile ? 0 : 300 }} className={`wrap-item ${item.className}`}>
      <Item className="achieve-margin-right">
        <div className={`achieve-circle`}>
          <p className="achieve-item-title">{item.title}</p>
        </div>
        <p className="text-align-center description achieve-item-sub-title">{item.content}</p>
      </Item>
    </Card>
  );
  return (
    <Styled className="default-padding-horizontal default-padding-vertical default-margin-top background2">
      <p className="main-title-text achieve-title">{marketTrs.privacyMarketplace}</p>
      <h6 className="text2 achieve-sub-title">{marketTrs.inCogIsNone}</h6>
      <Row className="achieve-wrap default-margin-top">
        <Col xs={24}>
          <List
            grid={{
              xs: 2,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 4,
              xxl: 4,
            }}
            style={{ marginLeft: 12 }}
            dataSource={Factory}
            renderItem={renderItem}
          />
        </Col>
      </Row>
    </Styled>
  );
};

export default React.memo(MarketAchieve);
