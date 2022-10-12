import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  /* Tooltip text */
  .tooltip-text {
    visibility: hidden;
    background-color: ${({ theme }) => theme.background2};
    border-radius: 16px;
    top: 65px;
    right: 0;
    width: 412px;
    padding: 24px;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
    white-space: pre-wrap;
    text-align: start;
  }

  .arrow-up {
    visibility: hidden;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid ${({ theme }) => theme.background2};
    top: 48px;
    right: 10px;
    position: absolute;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  :hover .tooltip-text {
    visibility: visible;
  }

  :hover .arrow-up {
    visibility: visible;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .tooltip-text {
      width: 300px;
    }
  `}
`;

const Tooltip2 = React.memo(({ title, className }: { title: string; className: string }) => {
  return (
    <Styled className={`tool-tip ${className}`}>
      {title}
      <div className="arrow-up" />
      <p className="tooltip-text">{`Privacy Coins (pCoins) are 1:1 privacy-protecting equivalents of cryptocurrencies like BTC (pBTC), ETH (pETH), BNB (pBNB), etc. They do not appear on public block explorers and are completely confidential.\n\nWhen a coin enters the Incognito network through a connecting bridge, a pCoin is minted. When a withdrawal is made, the pCoin is burned, and the coin is released to the external wallet.`}</p>
    </Styled>
  );
});

export default Tooltip2;
