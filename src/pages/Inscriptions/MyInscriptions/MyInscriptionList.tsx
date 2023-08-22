import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import InscriptionItem from 'pages/Inscriptions/MyInscriptions/MyInscriptionItem';
import {
  ButtonConfirm,
  Container,
  InfiniteScrollContainer,
} from 'pages/Inscriptions/MyInscriptions/MyInscriptionList.styled';
import React, { useMemo } from 'react';
import { File } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getKeySearchSelector, getMyInscriptionSortedList, Inscription } from 'state/inscriptions';
import { webWalletStateSelector } from 'state/masterKey';

const MyInscriptionList = () => {
  const history = useHistory();
  const { showUnlockModal } = useUnlockWallet();
  const myInscriptionListDefault = useSelector(getMyInscriptionSortedList) || [];
  const walletState = useSelector(webWalletStateSelector);
  const keySearch = useSelector(getKeySearchSelector);

  const _walletAction = () => showUnlockModal();

  // const dispatch = useDispatch();

  const checkVaidateKeySearch = useMemo(() => {
    let isValid = true;
    let getDefault = false;
    let queryIndex = false;
    if (keySearch && keySearch.length > 0) {
      if (isNaN(Number(keySearch))) {
        queryIndex = false;
        if (keySearch.length !== 64) {
          isValid = false;
        }
      } else {
        queryIndex = true;
      }
    } else {
      getDefault = true;
    }
    return {
      isValid,
      getDefault,
      queryIndex,
    };
  }, [keySearch]);

  const myInscriptionList = useMemo(() => {
    const { isValid, getDefault, queryIndex } = checkVaidateKeySearch;
    let list: Inscription[] = [];

    if (getDefault) {
      list = myInscriptionListDefault || [];
    } else if (isValid) {
      if (queryIndex) {
        list = myInscriptionListDefault?.filter((item) => item.index === Number(keySearch)) || [];
      } else {
        list = myInscriptionListDefault?.filter((item) => item.token_id === keySearch) || [];
      }
    } else {
      list = myInscriptionListDefault || [];
    }
    return list;
  }, [checkVaidateKeySearch, myInscriptionListDefault, keySearch]);

  const renderItem = (item: any, index: number) => {
    return <InscriptionItem item={item} key={`${item?.token_id}-${index}}`}></InscriptionItem>;
  };

  const renderEmptyList = () => {
    return (
      <div className="emptyList">
        <File color="white" size={100} />
        <p className="emptyText">{'No Recent Inscriptions'}</p>
      </div>
    );
  };

  const renderList = () => {
    return (
      <InfiniteScrollContainer>
        <InfiniteScroll className="gridView" loadMore={() => {}} hasMore={false} threshold={5}>
          {myInscriptionList &&
            myInscriptionList.length > 0 &&
            myInscriptionList.map((item, index) => renderItem(item, index))}
        </InfiniteScroll>
      </InfiniteScrollContainer>
    );
  };

  const renderContentView = () => {
    if (walletState === WalletState.unlocked) {
      if (!myInscriptionList || myInscriptionList.length < 1) {
        return renderEmptyList();
      } else {
        return renderList();
      }
    } else {
      return (
        <ButtonConfirm onClick={_walletAction}>
          <p className="text">{walletState === WalletState.locked ? 'Unlock Wallet' : 'Create Wallet'}</p>
        </ButtonConfirm>
      );
    }
  };

  return <Container>{renderContentView()}</Container>;
};

export default React.memo(MyInscriptionList);
