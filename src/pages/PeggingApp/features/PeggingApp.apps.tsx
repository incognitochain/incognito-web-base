import { Col, Row } from 'antd';
import avveImg from 'assets/images/avve-logo.png';
import cakeImg from 'assets/images/cake-icon.png';
import curveImg from 'assets/images/curve-icon.png';
import joeImg from 'assets/images/joe-icon.png';
import linkImg from 'assets/images/link-icon.png';
import raydiumImg from 'assets/images/raydium-logo.png';
import solendImg from 'assets/images/solend-logo.png';
import spookyImg from 'assets/images/spooky-icon.png';
import trisolarisImg from 'assets/images/trisolaris-icon.png';
import uniImg from 'assets/images/uni-icon.png';
import unknowImg from 'assets/images/unknow-icon.png';
import React from 'react';
// import { isMobile } from 'react-device-detect';
import styled, { DefaultTheme } from 'styled-components/macro';
const Styled = styled(Row)`
  margin-top: 60px;
  flex-direction: row;
  justify-content: space-between;
  .line-view {
    width: 24px;
  }
  .line {
    width: 0;
    height: 16px;
  }
  .app-margin-right {
    margin-right: 20px;
  }
  .app-margin-left {
    margin-left: 20px;
  }
  .app-margin-top {
    margin-top: 40px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        flex-direction: column;
        margin-top: 0px;
        .app-margin-top {
            margin-top: 0px;
        }
        .app-margin-right {
          margin-right: 0px;
        }
        .app-margin-left {
          margin-left: 0px;
        }
        .app-margin-top-small {
            margin-top: 8px;
        }
  `}
`;
const StyledItem = styled(Col)<{ isMobile: boolean }>`
  display: flex;

  .wrap-item-content {
    padding: 30px 30px 20px;
    border-radius: 16px;
    flex: 1;
  }

  .full-height {
    height: 100%;
  }

  .item-img {
    margin-right: 32px;
    width: 120px;
    height: 120px;
  }

  .large-text {
    font-weight: 600;
    font-size: 34px;
    line-height: 48px;
  }

  .normal-text {
    height: fit-content;
  }

  .wrap-name {
    display: inline-flex;
    align-items: baseline;
  }

  .wrap-chain {
    margin-right: 10px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 16px;
    padding-left: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.background3};
    p {
      color: white;
    }
  }

  .wrap-main-content {
    flex-direction: column;
  }

  .desc-text {
    margin-top: 32px;
  }

  .medium-text {
    font-size: 22px;
  }

  .name-desc-text {
    margin-left: 16px;
  }

  .link-text {
    color: ${({ theme }) => theme.blue1};
    cursor: pointer;
  }

  .wrap-status {
    padding: 2px 8px;
    border: 1px solid ${({ theme }) => theme.text1};
    width: fit-content;
    color: ${({ theme }) => theme.text1};
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .status-text {
    height: fit-content;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      .wrap-item-content {
        padding: 32px 32px 40px;
      }
      .item-img {
        width: 90px;
        height: 90px;
      }
      .large-text {
        font-size: 22px;
        line-height: 30px;
      }
      .medium-text {
        font-size: 16px;
      }
      .status-text {
        font-size: 12px;
      }
  `};

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
        width: 100%;
        margin-top: 4px;
        .wrap-item-content {
           padding: 16px 16px 24px;
           flex: 1;
        }
        .wrap-name {
            flex-direction: column;
        }
        .item-img {
            margin-right: 16px;
            width: 50px;
            height: 50px;
        }
       .desc-text {
         margin-top: 24px;
       }
        .wrap-chain {
            min-height: 24px;
        }
        .chain-text {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
        }
  `};

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium<{ isMobile: boolean }>`
      .wrap-name {
        display: inline-flex;
        align-items: baseline;
      }
      .name-desc-text {
        margin-left: 0px;
      }
      .wrap-apps-head {
      }
      .wrap-chain {
        margin-right: 8px;
        border-radius: 4px;
        padding-top: 3px;
        padding-bottom: 3px;
      }
      .chain-text {
        line-height: 18px;
      }
      .wrap-status {
        margin-bottom: ${({ isMobile }) => (isMobile ? 0 : 8)}px;
        margin-left: ${({ isMobile }) => (isMobile ? 8 : 0)}px;
      }
      .status-text {
      }
  `};
`;

const Item = React.memo(({ className, data }: { className?: string; data: any }) => {
  const ChainList = React.useMemo(
    () => (
      <Row style={{ minWidth: 250 }}>
        {data.chain.map((item: any) => (
          <div style={{ marginTop: 12 }} key={item} className="wrap-chain background3">
            <p className="h8">{item}</p>
          </div>
        ))}
      </Row>
    ),
    []
  );
  const Status = React.useMemo(
    () =>
      data.status ? (
        <div className="wrap-status">
          <p className="status-text description4 normal-text color-white">{data.status}</p>
          {/* <p className="status-text fw-medium normal-text">{data.status}</p> */}
        </div>
      ) : null,
    []
  );
  let isMobile = false;
  return (
    <StyledItem md={24} xl={12} key={data.name} isMobile={isMobile}>
      <Col className={`wrap-item-content background2 ${className}`}>
        <Row align="middle" className="wrap-apps-head">
          <img src={data.img} className="item-img" alt="icon" />
          <Col className="wrap-main-content">
            {!isMobile && Status}
            <div className="wrap-name">
              <Row align="middle">
                <h5 className="normal-text">{data.name}</h5>
                {isMobile && Status}
              </Row>
              <p className="text2 normal-text name-desc-text h8">{data.nameDesc}</p>
            </div>
            {!isMobile && ChainList}
          </Col>
          {isMobile && ChainList}
        </Row>
        <p className="normal-text desc-text description h8 color-white" style={{ color: 'white' }}>
          {data.desc}{' '}
          {!!data.link && (
            <span
              className="link-text"
              onClick={() => {
                window.open(data.linkPath, '_blank');
              }}
            >
              {` ${data.link}`}
              <img src={linkImg} style={{ width: isMobile ? 14 : 18, height: 'auto', marginLeft: 5 }} alt="link-icon" />
            </span>
          )}
        </p>
      </Col>
    </StyledItem>
  );
});

const PeggingListApps = () => {
  return (
    <Styled>
      <Item
        data={{
          img: cakeImg,
          name: 'pPancake',
          nameDesc: 'Private Pancake',
          status: 'SHIPPED',
          chain: ['BNB Chain', 'DEX'],
          desc: "Trade anonymously on BNB Chain's leading DEX. Deep liquidity and super low fees – now with privacy.",
        }}
        className="app-margin-right"
      />
      <Item
        data={{
          img: uniImg,
          name: 'pUniswap',
          nameDesc: 'Private Uniswap',
          status: 'SHIPPED',
          chain: ['Polygon', 'Ethereum', 'DEX'],
          desc: 'Trade confidentially on everyone’s favorite DEX. Faster and cheaper thanks to Polygon, and private like all Incognito apps.',
        }}
        className="app-margin-top-small app-margin-left full-height"
      />
      <Item
        data={{
          img: curveImg,
          name: 'pCurve',
          nameDesc: 'Private Curve',
          status: 'SHIPPED',
          chain: ['Polygon', 'DEX'],
          desc: 'Swap stablecoins with complete confidentiality using Privacy Curve. Low fees on Polygon meets full privacy on Incognito.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: spookyImg,
          name: 'pSpooky',
          status: 'SHIPPED',
          nameDesc: 'Private SpookySwap',
          chain: ['Fantom', 'DEX'],
          desc: 'Explore DeFi on Fantom with full privacy for your activity and assets. Swap Fantom coins anonymously with Private SpookySwap.',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: joeImg,
          name: 'pTraderJoe',
          status: 'SHIPPED',
          nameDesc: 'Private Trader Joe',
          chain: ['Avalanche', 'DEX'],
          desc: 'Trade confidentially on Trader Joe. Faster privacy swap is enabled by fast transaction finality on Avalanche.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: trisolarisImg,
          name: 'pTrisolaris',
          status: 'COMING SOON',
          nameDesc: 'Private Trisolaris',
          chain: ['Aurora', 'DEX'],
          desc: 'Privacy Swap comes to Aurora ecosystem for the first time. Multiple AMMs for best-in-class execution, now with privacy.',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: raydiumImg,
          name: 'pRaydium',
          status: 'COMING SOON',
          nameDesc: 'Private Raydium',
          chain: ['Solana', 'DEX', 'Farming'],
          desc: 'Explore DeFi on Solana with full privacy for your activity and assets. Swap, provide liquidity, farm, and stake.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: avveImg,
          name: 'pAave',
          status: 'COMING SOON',
          nameDesc: 'Private Aave',
          chain: ['Polygon', 'Lending'],
          desc: 'Earn interest on deposits and borrow assets on everyone’s favorite lending protocol – confidentially.',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
      <Item
        data={{
          img: solendImg,
          name: 'pSolend',
          status: 'COMING SOON',
          nameDesc: 'Private Solend',
          chain: ['Solana', 'Lending'],
          desc: 'Get privacy for what you lend, borrow, and earn on Solana. Protect your activity from prying eyes.',
        }}
        className="app-margin-top app-margin-top-small app-margin-right"
      />
      <Item
        data={{
          img: unknowImg,
          name: 'pAnything',
          nameDesc: 'Private Anything',
          chain: ['Blockchain', 'Use case'],
          desc: 'The Incognito community is building out the 2022 roadmap. Which app do you want privacy for?',
          link: 'Join the conversation',
          linkPath: 'https://we.incognito.org/t/incognito-2022-technical-roadmap/15002',
        }}
        className="app-margin-top app-margin-top-small app-margin-left"
      />
    </Styled>
  );
};

export default React.memo(PeggingListApps);
