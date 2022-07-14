/* eslint-disable react/display-name */
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';
import styled from 'styled-components/macro';

import FollowTokenItem from './FollowTokens.token';

const Styled = styled.div`
  width: 100%;
  overflow-y: auto;
  padding-top: 15px;
`;

const FollowTokensList = React.memo(() => {
  const followTokenIDs = useAppSelector(incognitoAccountFollowTokenIDs);
  return (
    <Styled>
      {followTokenIDs && followTokenIDs.length > 0
        ? followTokenIDs.map((tokenID: string) => <FollowTokenItem tokenID={tokenID} key={tokenID} />)
        : null}
    </Styled>
  );
});

export default FollowTokensList;
