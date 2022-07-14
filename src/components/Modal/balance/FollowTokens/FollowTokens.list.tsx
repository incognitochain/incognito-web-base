/* eslint-disable react/display-name */
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';

import FollowTokenItem from './FollowTokens.token';

const FollowTokensList = React.memo(() => {
  // const followTokens = useSelector(sharedSelectors.followTokensFormatedSelector);
  const followTokens: any[] = [];
  return (
    <div>
      {followTokens && followTokens.length > 0
        ? followTokens.map((item: SelectedPrivacy) => <FollowTokenItem {...item} key={item.tokenID} />)
        : null}
    </div>
  );
});

export default FollowTokensList;
