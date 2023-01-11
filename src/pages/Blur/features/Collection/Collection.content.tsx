import { Row } from 'antd';
import { collectionsSelector } from 'pages/Blur';
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';

import enhance from './Collection.enhance';
import SearchInput from './Collection.input';
import List from './Collection.list';
import { ContentStyled } from './Collection.styled';

interface IProps {
  onFetchCollections: ({ page }: { page: number }) => void;
}

const Content = ({ onFetchCollections }: IProps) => {
  const { list: collections, isFetching } = useAppSelector(collectionsSelector);

  const renderLabel = (title: string) => <h3 style={{ color: 'white' }}>{title}</h3>;

  return (
    <ContentStyled>
      <Row className="header-row" justify="space-between">
        {renderLabel('Top')}
        <SearchInput />
      </Row>
      <List isFetching={isFetching} collections={collections} fetchCollections={onFetchCollections} />
    </ContentStyled>
  );
};

export default enhance(memo(Content));
