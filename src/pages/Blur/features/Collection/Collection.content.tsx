import { Tabs } from 'antd';
import { collectionsSelector } from 'pages/Blur';
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';

import enhance from './Collection.enhance';
import SearchInput from './Collection.input';
import List from './Collection.list';
import { ContentStyled } from './Collection.styled';

const DEFAULT_ACTIVE_KEY = '1';

const Content = () => {
  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentKeyTab, setCurrentKeyTab] = React.useState(DEFAULT_ACTIVE_KEY);
  const { list: collections, isFetching } = useAppSelector(collectionsSelector);

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
    <ContentStyled>
      <Tabs
        defaultActiveKey={DEFAULT_ACTIVE_KEY}
        onChange={onChangeTab}
        items={[
          {
            label: renderLabel('1', 'Top'),
            key: '1',
            children: (
              <>
                <SearchInput value={keySearch} onChange={onChange} />
                <List
                  isFetching={isFetching}
                  collections={collections}
                  onClickItem={() => {
                    return null;
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </ContentStyled>
  );
};

export default enhance(memo(Content));
