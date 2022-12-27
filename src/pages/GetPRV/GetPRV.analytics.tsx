import { Tooltip } from 'antd';
import { ReactComponent as Info } from 'assets/images/info.svg';
import { marketTranslateSelector } from 'config/Configs.selector';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { useAppSelector } from 'state/hooks';
import { explorerSelectors } from 'state/pools';
import styled, { DefaultTheme } from 'styled-components/macro';

export const Styled = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: 60px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1100px !important;
  .achieve-title {
    text-align: center;
  }
  .achieve-sub-title {
    text-align: center;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
  }

  .fade-in-section {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out, visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    .ant-card-body {
      padding: 0px;
    }
  `}
`;

const Item = styled.div`
  .achieve {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .achieve-item-title {
    font-weight: 700;
    font-size: 34px;
    line-height: 120%;
    text-align: center;
    margin-bottom: 0;
    color: ${({ theme }) => theme.text1};
  }
  .achieve-item-sub-title {
    color: ${({ theme }) => theme.text2};
    font-weight: 500;
    line-height: 140%;
    text-align: center;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        .achieve-item-sub-title {
          font-weight: 400;
          line-height: 140%;
          text-align: center;
        }
    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
        .achieve {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
        }
        .achieve-item-sub-title {
            line-height: 27px;
        }
        .achieve-item-title {
        }
    `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .ant-card-body {
          }
          .achieve-item-title {
            font-size: 34px;
          }
          .achieve {
            margin-bottom: 24px;
          }
          .achieve-item-sub-title {
          }
    `}
`;

const Analytics = () => {
  const marketTrs = useSelector(marketTranslateSelector);

  const [isCountUp, setIsCountUp] = useState<boolean>(true);
  const { prvPrice: price, totalSupply } = useAppSelector(explorerSelectors);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Factory = React.useMemo(() => {
    const last = `${price}`.split('.');
    let length = 0;
    if (last && last.length > 1) {
      length = last[1].length;
    }
    return [
      {
        number: price,
        prefix: '$',
        suffix: '',
        decimals: length,
        desc: 'Price',
      },
      {
        number: totalSupply,
        prefix: '',
        suffix: '',
        desc: 'Circulating Supply',
      },
      {
        number: '100000000',
        prefix: '',
        suffix: '',
        desc: 'Total supply',
      },
    ];
  }, [marketTrs, totalSupply, price]);

  const renderItem = (item: any) => {
    return (
      <Item style={{ flex: 1, minWidth: 200 }}>
        <div className={'achieve'}>
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isVisible) {
                setIsCountUp(true);
              }
            }}
            delayedCall
          >
            <CountUp
              className="achieve-item-title"
              start={0}
              end={isCountUp ? item?.number : 0}
              duration={1}
              decimal="."
              prefix={item?.prefix}
              suffix={item?.suffix}
              decimals={item?.decimals}
              separator=","
              enableScrollSpy={true}
            />
          </VisibilitySensor>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <p className="h8 achieve-item-sub-title">{item.desc}</p>
            {item?.tooltipContent && (
              <Tooltip title={item?.tooltipContent}>
                <Info style={{ marginLeft: 5 }} />
              </Tooltip>
            )}
          </div>
        </div>
      </Item>
    );
  };
  return (
    <>
      <h3>Token Metrics</h3>
      <Styled className="default-max-width">
        {Factory?.map((item, i) => {
          return renderItem(item);
        })}
      </Styled>
    </>
  );
};

export default React.memo(Analytics);
