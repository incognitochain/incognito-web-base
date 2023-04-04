/* eslint-disable react/display-name */
import { useModal } from 'components/Modal';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import FollowTokenDetail from 'pages/IncWebWallet/components/FollowTokenDetail';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import { setFollowTokenSelectedByToken } from 'pages/IncWebWallet/state/followTokenSelected.actions';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import { followTokensFormatedSelector } from 'state/token/token.selectors';
import styled from 'styled-components/macro';

import PaymentAddressBar from '../PaymentAddressBar';
import FollowTokenItem from './FollowTokens.token';

const Styled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const FollowTokensList = React.memo(() => {
  const followTokensFormated = useAppSelector(followTokensFormatedSelector) || [];

  const dispatch = useDispatch();
  const { setModal } = useModal();

  const walletController = useWalletController();

  const followTokenItemOnClicked = useCallback((tokenSelected: any) => {
    // console.log('followTokenItemOnClicked ', { tokenSelected, walletController });
    if (walletController.isWalletExtension) return;
    if (walletController.isWalletWeb) {
      dispatch(setFollowTokenSelectedByToken(tokenSelected));
      setModal({
        closable: false,
        data: <FollowTokenDetail />,
        isTransparent: false,
        rightHeader: undefined,
        title: '',
        isSearchTokenModal: false,
        hideHeaderDefault: true,
      });
    }
  }, []);

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
        {/* {isShowFollowTokenDetail && (
          <FollowTokenDetail
            isModalOpen={isShowFollowTokenDetail}
            data={tokenSelected}
            onCloseModal={() => setShowFollowTokenDetail(false)}
          />
        )} */}
      </Styled>
    </>
  );
});

export default FollowTokensList;
