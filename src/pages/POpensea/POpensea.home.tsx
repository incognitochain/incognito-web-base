/* eslint-disable react-hooks/rules-of-hooks */
import { Tabs } from 'antd';
import SearchSVG from 'assets/svg/search-icon.svg';
import { POpenseaCollection } from 'models/model/POpenseaCollection';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  actionGetPOpenseaCollections,
  actionSetSelectedCollection,
  isFetchingPOpenseaSelectors,
  pOpenseaCollectionsSearchSelectors,
} from 'state/pOpensea';

import POpenseaInfo from './components/POpensea.info';
import POpenseaListCollection from './components/POpensea.listCollection';
// import POpenseaSubRoute from './components/POpensea.subRoute';
import { Styled, TextInputStyled, WrapperContent } from './POpensea.styled';

const defaultActiveKey = '1';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentKeyTab, setCurrentKeyTab] = React.useState(defaultActiveKey);

  const collections = useSelector(pOpenseaCollectionsSearchSelectors)(keySearch);
  const isFetching = useSelector(isFetchingPOpenseaSelectors);

  React.useEffect(() => {
    dispatch(actionGetPOpenseaCollections());
  }, []);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const onChangeTab = (key: string) => {
    setCurrentKeyTab(key);
  };

  const onClickCollectionItem = (item: POpenseaCollection) => {
    if (item.primaryAssetContracts && item.primaryAssetContracts.length > 0) {
      dispatch(actionSetSelectedCollection(item));
      history.push(`/papps/popensea/detail/${item.primaryAssetContracts[0].address}`);
    }
  };

  const renderLabel = (key: string, title: string) => (
    <h3 style={{ color: currentKeyTab === key ? 'white' : '#757575' }}>{title}</h3>
  );

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaInfo />
        {/* <POpenseaSubRoute /> */}
        <Tabs
          defaultActiveKey={defaultActiveKey}
          onChange={onChangeTab}
          items={[
            {
              label: renderLabel('1', 'Top'),
              key: '1',
              children: (
                <div>
                  <div className="input-container">
                    <img className="search-ic" src={SearchSVG} />
                    <TextInputStyled
                      placeholder={'Search collections'}
                      type={'text'}
                      onChange={onChange}
                      value={keySearch}
                      autoFocus={false}
                    />
                  </div>
                  <POpenseaListCollection
                    isFetching={isFetching}
                    collections={collections}
                    onClickItem={onClickCollectionItem}
                  />
                </div>
              ),
            },
            // {
            //   label: renderLabel('2', 'Top'),
            //   key: '2',
            //   children: (
            //     <POpenseaListCollection
            //       isFetching={isFetching}
            //       collections={collections}
            //       onClickItem={onClickCollectionItem}
            //     />
            //   ),
            // },
          ]}
        />
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
