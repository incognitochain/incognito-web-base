/* eslint-disable react/display-name */
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import FollowTokenDetail from 'pages/IncWebWallet/components/FollowTokenDetail';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import { setFollowTokenSelectedByToken } from 'pages/IncWebWallet/state/followTokenSelected.actions';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [tokenSelected, setTokenSelected] = useState<any>(null);

  const [isShowFollowTokenDetail, setShowFollowTokenDetail] = useState<boolean>(false);

  const dispatch = useDispatch();

  const walletController = useWalletController();

  const followTokenItemOnClicked = useCallback((tokenSelected: any) => {
    // console.log('followTokenItemOnClicked ', { tokenSelected, walletController });
    if (walletController.isWalletExtension) return;
    if (walletController.isWalletWeb) {
      dispatch(setFollowTokenSelectedByToken(tokenSelected));
      setTokenSelected(tokenSelected);
      setShowFollowTokenDetail(true);
    }
  }, []);

  // console.log('followTokensFormated ', followTokensFormated);
  return (
    <>
      <PaymentAddressBar />
      <Styled>
        {followTokensFormated && followTokensFormated.length > 0
          ? followTokensFormated.map((selectedToken: SelectedPrivacy) => (
              <FollowTokenItem
                selectedToken={selectedToken}
                key={selectedToken.tokenID}
                onItemClick={followTokenItemOnClicked}
              />
            ))
          : null}
        {isShowFollowTokenDetail && (
          <FollowTokenDetail
            isModalOpen={isShowFollowTokenDetail}
            data={tokenSelected}
            onCloseModal={() => setShowFollowTokenDetail(false)}
          />
        )}
      </Styled>
    </>
  );
});

export default FollowTokensList;
