/* eslint-disable react-hooks/rules-of-hooks */
import { Tabs } from 'antd';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  actionGetPOpenseaCollections,
  actionSetSelectedCollection,
  isFetchingPOpenseaSelectors,
  pOpenseaCollectionsSelectors,
} from 'state/pOpensea';

import POpenseaListCollection from './components/POpensea.listCollection';
import POpenseaSubRoute from './components/POpensea.subRoute';
import { Styled, WrapperContent } from './POpensea.styled';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const collections = useSelector(pOpenseaCollectionsSelectors);
  const isFetching = useSelector(isFetchingPOpenseaSelectors);

  React.useEffect(() => {
    dispatch(actionGetPOpenseaCollections());
  }, []);

  const onClickCollectionItem = (item: POpenseaCollection) => {
    if (item.primaryAssetContracts && item.primaryAssetContracts.length > 0) {
      dispatch(actionSetSelectedCollection(item));
      history.push(`/popensea/detail/${item.primaryAssetContracts[0].address}`);
    }
  };

  const renderLabel = (title: string) => <h3>{title}</h3>;

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaSubRoute />
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: renderLabel('Top'),
              key: '1',
              children: (
                <POpenseaListCollection
                  isFetching={isFetching}
                  collections={collections}
                  onClickItem={onClickCollectionItem}
                />
              ),
            },
          ]}
        />
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
