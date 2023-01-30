import { Row } from 'antd';
import { collectionsSelector } from 'pages/Pnft';
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';

import enhance from './Collections.enhance';
import SearchInput from './Collections.input';
import List from './Collections.list';
import { ContentStyled } from './Collections.styled';

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
