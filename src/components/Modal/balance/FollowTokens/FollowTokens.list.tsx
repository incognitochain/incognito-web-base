/* eslint-disable react/display-name */
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';

import FollowTokenItem from './FollowTokens.token';

const FollowTokensList = React.memo(() => {
  const followTokenIDs = useAppSelector(incognitoAccountFollowTokenIDs);
  return (
    <div>
      {followTokenIDs && followTokenIDs.length > 0
        ? followTokenIDs.map((tokenID: string) => <FollowTokenItem tokenID={tokenID} key={tokenID} />)
        : null}
    </div>
  );
});

export default FollowTokensList;
