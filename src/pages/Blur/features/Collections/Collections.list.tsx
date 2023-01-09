import { Tabs } from 'antd';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import enhance from './Collection.enhance';
import { ListStyled } from './Collection.styled';
import SearchInput from './Collections.input';

const DEFAULT_ACTIVE_KEY = '1';

const CollectionsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentKeyTab, setCurrentKeyTab] = React.useState(DEFAULT_ACTIVE_KEY);

  const onChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const onChangeTab = (key: string) => {
    setCurrentKeyTab(key);
  };

  const renderLabel = (key: string, title: string) => (
    <h3 style={{ color: currentKeyTab === key ? 'white' : '#757575' }}>{title}</h3>
  );

  return (
    <ListStyled>
      <Tabs
        defaultActiveKey={DEFAULT_ACTIVE_KEY}
        onChange={onChangeTab}
        items={[
          {
            label: renderLabel('1', 'Top'),
            key: '1',
            children: <SearchInput value={keySearch} onChange={onChange} />,
          },
        ]}
      />
    </ListStyled>
  );
};

export default enhance(memo(CollectionsList));
