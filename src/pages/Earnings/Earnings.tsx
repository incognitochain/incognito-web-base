import { memo } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

import ListPoolTable from './components/ListPoolTable';

export const Styled = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 0px;
  text-align: center;
  .padding-vertical-container {
    padding-bottom: 110px;
  }
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .padding-vertical-container {
      padding-top: 36px;
      padding-bottom: 80px;
    }
  `}
  .row-button {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .more-detail-title {
      color: #ffffff;
      margin-left: 32px;
      cursor: pointer;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 24px;
      padding-right: 24px;
      background-color: #1a73e8;
      border-radius: 8px;
      height: 60px;
      font-weight: 500;
      font-size: 18px;
      line-height: 120%;
      text-align: center;
      color: #ffffff;
      :hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    .button {
      height: 40px;
      padding-left: 16px;
      padding-right: 16px;
      font-weight: 500;
      font-size: 14px;
    }
  `}
  }
`;

const Earnings = () => {
  return (
    <Styled>
      <div className="default-max-width padding-vertical-container">
        <h3>Become a Liquidity Provider for DEX</h3>
        <div className="row-button">
          <div
            className="button"
            onClick={() => {
              window.open('https://we.incognito.org/t/how-to-contribute-liquidity-and-earn-rewards/15254', '_blank');
            }}
          >
            {'Earn now'}
          </div>
          <div
            className="button"
            style={{ backgroundColor: 'transparent', marginLeft: 8 }}
            onClick={() => {
              window.open('https://we.incognito.org/t/incognito-exchange-liquidity-mining/16083', '_blank');
            }}
          >
            More details
          </div>
        </div>
        <ListPoolTable />
      </div>
    </Styled>
  );
};

export default memo(Earnings);
