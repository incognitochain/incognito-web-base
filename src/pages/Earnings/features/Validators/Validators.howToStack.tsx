import { Button, Col, Row } from 'antd';
import { memo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const ItemStyled = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 24px;
  background-color: #252525;

  .circleView {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #303030;

    .number {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
  }

  .titleContainer {
    margin-top: 40px;
  }

  .descriptionContainer {
    margin-top: 24px;
  }

  .description {
    margin-top: 10px;
  }

  :hover {
    background-color: #363636;
    .circleView {
      background-color: #1a1a1a;
    }
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
    .titleContainer {
      margin-top: 40px;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .titleContainer {
      margin-top: 30px;
    }
    .descriptionContainer {
      margin-top: 20px;
    }
  `}
  

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .titleContainer {
      margin-top: 20px;
    }
    .descriptionContainer {
      margin-top: 18px;
    }
  `}
`;

interface StackItemProps {
  index?: number;
  title?: string;
  description?: string;
}

const StackItem = (props: StackItemProps) => {
  const { index = 0, title = '', description = '' } = props;
  return (
    <ItemStyled>
      <div className="circleView">
        <h5>{index}</h5>
      </div>
      <div className="titleContainer">
        <h4>{title}</h4>
      </div>

      <div className="descriptionContainer">
        <h6>{description}</h6>
      </div>
    </ItemStyled>
  );
};

const Styled = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;

  .topView {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    .topLeft {
    }

    .topRight {
      display: flex;
      flex-direction: row;
      align-items: center;
      button {
        margin-right: 10px;
        cursor: pointer;
      }

      .prvButton {
        margin-left: 40px;
      }

      p {
        line-height: 120%;
        cursor: pointer;
        :hover {
          opacity: 0.7;
        }
      }
    }
  }

  .stackItemListView {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    width: 100%;
    .space {
      height: 100%;
      width: 30px;
    }

    .row {
      display: flex;
      flex: 1;
      width: 100%;
    }
  }

  .margin {
    margin-top: 20px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 80px;
    .topView {
      display: flex;
      flex-direction: column;
      .topLeft {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-top: 40px;
    .topView {
      .topRight {
        flex-direction: column;
        justify-content: center;
        button {
          margin-top: 10px;
          cursor: pointer;
        }
        .prvButton {
          margin-top: 30px;
          margin-left: 0px;
        }
      }
    }

    .stackItemListView {
      margin-top: 28px;
    }
  `}
`;

const ValidatorHowToStack = () => {
  const myRef = useRef<any>(undefined);
  const location = useLocation();
  const state = location.state as { activeScroll: boolean };

  useEffect(() => {
    if (myRef && state && state.activeScroll) {
      myRef && myRef?.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <Styled ref={myRef} id="HOW_STAKE">
      <div className="topView">
        <div className="topLeft">
          <h3>How to stake</h3>
        </div>
        <div className="topRight">
          <button
            onClick={() => {
              window.open('https://we.incognito.org/t/how-to-host-a-virtual-node/194', '_blank');
            }}
          >
            <p className="description description3 color-white">See full walkthrough</p>
          </button>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="button1 prvButton"
            onClick={() => {
              window.open('https://we.incognito.org/t/how-to-buy-prv-in-3-steps/793', '_blank');
            }}
          >
            {'Buy PRV'}
          </Button>
        </div>
      </div>
      <div className="stackItemListView">
        <Row className="row" gutter={{ xs: 16, sm: 22, md: 28, lg: 30 }}>
          <Col lg={6} md={12} sm={16} xs={28} className={'margin'}>
            <StackItem
              index={1}
              title={'Get VPS'}
              description={'Prepare an always-on computer or set up a Virtual Private Server (VPS).'}
            />
          </Col>
          <Col lg={6} md={12} sm={16} xs={28} className={'margin'}>
            <StackItem
              index={2}
              title={'Docker and Script installation'}
              description={`Start your node using Incognito's convenient and easy installation script.`}
            />
          </Col>
          <Col lg={6} md={12} sm={16} xs={28} className={'margin'}>
            <StackItem
              index={3}
              title={'Stake 1,750 PRV'}
              description={'A fair fixed stake amount which remains locked while running a validator node.'}
            />
          </Col>
          <Col lg={6} md={12} sm={16} xs={28} className={'margin'}>
            <StackItem
              index={4}
              title={'Earnings'}
              description={`Your Node is all set. Let’s wait to be selected to earn rewards and make profit.`}
            />
          </Col>
        </Row>
      </div>
    </Styled>
  );
};

export default memo(ValidatorHowToStack);
