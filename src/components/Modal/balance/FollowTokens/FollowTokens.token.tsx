/* eslint-disable react/display-name */
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { Image } from '../../../Core/Image';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  .center {
    align-items: center;
    justify-content: center;
  }
`;

const Styled = styled.div`
  height: 74px;
  display: flex;
  align-items: center;
  padding: 0px 12px 0px 12px;
  border-radius: 8px;
  cursor: pointer;
  /* border-bottom: 1px solid ${({ theme }) => theme.bg4}; */
  .wrap-content-body {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  :hover {
    background: ${({ theme }) => theme.bg4};
    cursor: pointer;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }

  .desc-text {
    color: ${({ theme }) => theme.bg4};
  }
  .network {
    color: ${({ theme }) => theme.bg4};
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 6px;
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 4px;
  }

  .amount-area {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
`;

const Token = React.memo(({ selectedToken, onItemClick }: { selectedToken: SelectedPrivacy; onItemClick: any }) => {
  if (!selectedToken.symbol) return null;
  const { symbol, shortName, network, formatAmount, formatBalanceByUsd, iconUrl } = selectedToken;
  return (
    <Styled
      onClick={() => {
        onItemClick && onItemClick(selectedToken);
      }}
    >
      <Image iconUrl={iconUrl} size={true ? 40 : 32} />
      <Row className="wrap-content-body">
        <div>
          <ThemedText.RegularLabel color="primary5">{symbol}</ThemedText.RegularLabel>
          <Row className="center">
            <ThemedText.SmallLabel color="primary8">{shortName}</ThemedText.SmallLabel>
            {!!network && (
              <div className="network">
                <ThemedText.SmallLabel color="primary8" style={{ padding: 2 }}>
                  {network}
                </ThemedText.SmallLabel>
              </div>
            )}
          </Row>
        </div>
        <div className="amount-area">
          <ThemedText.RegularLabel color="primary5">{`$${formatBalanceByUsd || 0}`}</ThemedText.RegularLabel>
          <ThemedText.SmallLabel
            color="primary8"
            style={{
              fontSize: 'small',
            }}
          >{`${formatAmount || 0} ${symbol}`}</ThemedText.SmallLabel>
        </div>
      </Row>
    </Styled>
  );
});

export default Token;
