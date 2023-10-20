import { useModal } from 'components/Modal';
import useThrottle from 'hooks/useThrottle';
import UnlockWalletModal from 'pages/IncWebWallet/components/UnlockWalletModal';
import { WalletState } from 'pages/IncWebWallet/core/types';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFilterPageSelector, resetSearchState, setFilterPage, setKeySearch } from 'state/inscriptions';
import { webWalletStateSelector } from 'state/masterKey';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

import HistoryButton from './HistoryButton';

type FilterItem = {
  key: string;
  title: string;
  isVisible: boolean;
  path: string;
};

const FilterItemList: FilterItem[] = [
  {
    key: 'All',
    title: 'All',
    isVisible: true,
    path: '/inscriptions',
  },
  {
    key: 'My Inscriptions',
    title: 'My Inscriptions',
    isVisible: true,
    path: '/my-inscriptions',
  },
];

export const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  ${MediaQueryBuilder(
    'upToLarge',
    css`
      width: 100%;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      width: 100%;
    `
  )}
`;

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;

  .item {
    padding: 10px 15px;
    min-width: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid #404040;
    border-radius: 1000px;

    .selected {
      background-color: black !important;
      background: red;
    }

    .nonselected {
      background-color: white !important;
    }

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }

    p {
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.35rem;
    }
  }
`;

type Props = {
  data?: any;
  showHistory?: any;
};

const FilterBox = (props: Props) => {
  const { showHistory } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const webWalletState = useSelector(webWalletStateSelector);
  const filterPage = useSelector(getFilterPageSelector);
  const { setModal } = useModal();

  const itemList = FilterItemList.filter((item) => item.isVisible);

  const currentItem = useMemo(() => {
    return itemList.filter((item) => item.title === filterPage)[0];
  }, [filterPage, itemList]);

  const isMyInscriptionPage = useMemo(() => {
    return currentItem.title === 'My Inscriptions';
  }, [currentItem]);

  const itemOnClick = useCallback(
    (item: FilterItem) => {
      if (item.key === 'My Inscriptions') {
        if (webWalletState === WalletState.uninitialized) {
          history.push('/wallet/create');
        } else if (webWalletState === WalletState.locked) {
          setModal({
            closable: true,
            data: <UnlockWalletModal />,
            isTransparent: false,
            rightHeader: undefined,
            title: 'Unlock Wallet',
            isSearchTokenModal: true,
          });
        } else {
          dispatch(setFilterPage(item.title));
          // history.push(item.path);
        }
      } else {
        dispatch(setKeySearch(''));
        dispatch(setFilterPage(item.title));
        dispatch(resetSearchState());
        // history.push(item.path);
      }
    },
    [history, webWalletState]
  );

  const itemOnClickThrottle = useThrottle(itemOnClick, 500);

  const renderItem = (item: FilterItem, index: number) => {
    const isSelected = item.title === currentItem.title;
    return (
      <div
        key={item.key}
        className={`item`}
        style={{
          backgroundColor: isSelected ? '#404040' : 'transparent',
        }}
        onClick={() => {
          itemOnClickThrottle && itemOnClickThrottle(item);
        }}
      >
        <p>{item.title}</p>
      </div>
    );
  };

  const renderGroupItems = () => {
    return (
      <GroupItems>
        {itemList && itemList.length > 0 && itemList.map((item, index) => renderItem(item, index))}
      </GroupItems>
    );
  };

  const renderHistoryButton = () => {
    return <HistoryButton onClickCallBack={showHistory}></HistoryButton>;
  };

  return (
    <Container>
      <Row>
        {renderGroupItems()}
        {isMyInscriptionPage && renderHistoryButton()}
      </Row>
    </Container>
  );
};

export default FilterBox;
