import { marketTranslateSelector } from 'config/Configs.selector';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  justify-content: 'space-between';
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  .achieve-title {
    text-align: center;
  }
  .achieve-sub-title {
    text-align: center;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .achieve-sub-title {
          }
          .ant-card-body {
            padding: 0px;
          }
          .achieve-wrap {
          }
  `}
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
          .achieve-sub-title {
          }
          .ant-card-body {
            padding: 0px;
          }
          .achieve-wrap {
          }
          .item-margin-top {
          }
    `}
`;

const Item = styled.div`
  .achieve {
    flex: 1,
    display: flex;
    flex-direction: column;
    text-align: center;
    border-right: 1px solid #363636;
  }
  .achieve-item-title {
    font-weight: 500;
    font-size: 48px;
    line-height: 120%;
    text-align: center;
    margin-bottom: 0;
    color: ${({ theme }) => theme.text1};
  }
  .achieve-item-sub-title {
    color: ${({ theme }) => theme.text2};
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    margin-top: 8px;
    color: ${({ theme }) => theme.text2};
  }
  .wrap-item {
  }

  .border-right {
    border-right: 5px solid red;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        .achieve-item-title {
          font-weight: 500;
          font-size: 64px;
          line-height: 120%;
          text-align: center;
          margin-bottom: 0;
        }
        .achieve-item-sub-title {
          font-weight: 400;
          font-size: 20px;
          line-height: 140%;
          text-align: center;
          margin-top: 10px;
        }
    `}

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
        .achieve-item-title {
          font-weight: 500;
          font-size: 48px;
          line-height: 140%;
        }
        .achieve-item-sub-title {
          font-size: 18px;
          line-height: 140%;
          margin-top: 8px;
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
            font-size: 40px;
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

const MarketInfo = () => {
  const marketTrs = useSelector(marketTranslateSelector);

  const [isCountUp, setIsCountUp] = useState<boolean>(false);
  const Factory = React.useMemo(
    () => [
      {
        number: 550,
        prefix: '$',
        suffix: 'M',
        desc: marketTrs.volumeTraded,
      },
      {
        number: 1,
        prefix: '',
        suffix: 'M',
        desc: marketTrs.anonymousTrades,
      },
      {
        number: 200,
        prefix: '',
        suffix: '+',
        desc: marketTrs.privateCryptocurrencies,
      },
      {
        number: 16,
        prefix: '',
        suffix: '',
        desc: marketTrs.bridgedBlockchains,
      },
    ],
    [marketTrs]
  );

  const renderItem = (item: any) => (
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
            duration={3}
            prefix={item?.prefix}
            suffix={item?.suffix}
            enableScrollSpy={true}
          />
        </VisibilitySensor>
        <p className="description achieve-item-sub-title">{item.desc}</p>
      </div>
    </Item>
  );
  return (
    <Styled>
      {Factory?.map((item, i) => {
        return renderItem(item);
      })}
    </Styled>
  );
};

export default React.memo(MarketInfo);
