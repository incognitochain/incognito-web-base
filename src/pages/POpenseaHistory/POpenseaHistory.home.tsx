/* eslint-disable react-hooks/rules-of-hooks */
import { Tabs } from 'antd';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import OffersMadeList from './components/OffersMade/OffersMade.list';
import { Styled, WrapperContent } from './POpenseaHistory.styled';
import POpenseaHistorySubRoute from './POpenseaHistory.subRoute';

const defaultActiveKey = '1';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentKeyTab, setCurrentKeyTab] = React.useState(defaultActiveKey);

  const onChangeTab = (key: string) => {
    setCurrentKeyTab(key);
  };

  const renderLabel = (key: string, title: string) => (
    <h3 style={{ color: currentKeyTab === key ? 'white' : '#757575' }}>{title}</h3>
  );

  return (
    <Styled className="default-max-width">
      <WrapperContent>
        <POpenseaHistorySubRoute />
        <Tabs
          style={{ marginTop: 60 }}
          defaultActiveKey={defaultActiveKey}
          onChange={onChangeTab}
          items={[
            {
              label: renderLabel('1', 'Offers'),
              key: '1',
              children: <OffersMadeList />,
            },
          ]}
        />
      </WrapperContent>
    </Styled>
  );
};

export default memo(Home);
