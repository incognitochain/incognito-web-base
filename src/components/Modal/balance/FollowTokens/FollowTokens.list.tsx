/* eslint-disable react/display-name */
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { followTokensFormatedSelector } from 'state/token/token.selectors';
import styled from 'styled-components/macro';

import PaymentAddressBar from '../PaymentAddressBar';
import FollowTokenItem from './FollowTokens.token';

const Styled = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-top: 15px;
`;

const FollowTokensList = React.memo(() => {
  const followTokensFormated = useAppSelector(followTokensFormatedSelector) || [];
  return (
    <>
      <PaymentAddressBar />
      <Styled>
        {followTokensFormated && followTokensFormated.length > 0
          ? followTokensFormated.map((selectedToken: SelectedPrivacy) => (
              <FollowTokenItem selectedToken={selectedToken} key={selectedToken.tokenID} />
            ))
          : null}
      </Styled>
    </>
  );
});

export default FollowTokensList;
