/* eslint-disable react/display-name */
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
import styled from 'styled-components/macro';

const Styled = styled.div``;

const Token = React.memo((props: SelectedPrivacy | any) => {
  const { symbol } = props;
  // const { symbol, shortName, network, formatAmount, formatBalanceByUsd, iconUrl, tokenId: tokenID } = props;
  if (!symbol) return null;
  return <Styled />;
});

export default Token;
