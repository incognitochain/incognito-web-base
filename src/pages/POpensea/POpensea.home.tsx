/* eslint-disable react-hooks/rules-of-hooks */
import { pOpenseaTranslateSelector } from 'config/Configs.selector';
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

  const pOpenseaStr = useSelector(pOpenseaTranslateSelector);
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

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaSubRoute />
        <h3 className="fw-bold" style={{ textAlign: 'left' }}>
          {pOpenseaStr.mainTitle}
        </h3>
        <POpenseaListCollection isFetching={isFetching} collections={collections} onClickItem={onClickCollectionItem} />
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
