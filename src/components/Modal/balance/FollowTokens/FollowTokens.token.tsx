/* eslint-disable react/display-name */
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';

const Styled = styled.div``;

const Token = React.memo(({ tokenID }: { tokenID: string }) => {
  const selectedToken = useAppSelector(getPrivacyDataByTokenIDSelector)(tokenID);
  if (!selectedToken.symbol) return null;
  return <Styled>{selectedToken.formatAmountNoClip}</Styled>;
});

export default Token;
