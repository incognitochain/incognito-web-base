import { Row } from 'antd';
import { collectionsSelector } from 'pages/Blur';
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';

import enhance from './Collection.enhance';
import SearchInput from './Collection.input';
import List from './Collection.list';
import { ContentStyled } from './Collection.styled';

const DEFAULT_ACTIVE_KEY = '1';

const Content = () => {
  const [currentKeyTab, setCurrentKeyTab] = React.useState(DEFAULT_ACTIVE_KEY);
  const { list: collections, isFetching } = useAppSelector(collectionsSelector);

  const renderLabel = (key: string, title: string) => (
    <h3 style={{ color: currentKeyTab === key ? 'white' : '#757575' }}>{title}</h3>
  );

  return (
    <ContentStyled>
      <Row className="header-row" justify="space-between">
        {renderLabel('1', 'Top')}
        <SearchInput />
      </Row>
      <List
        isFetching={isFetching}
        collections={collections}
        onClickItem={() => {
          return null;
        }}
      />
    </ContentStyled>
  );
};

export default enhance(memo(Content));
