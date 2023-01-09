import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import { ICollection } from '../../Blur.interface';
import CollectionLoader from './Collection.loader';
import { ListStyled } from './Collection.styled';

interface IListProps {
  isFetching: boolean;
  collections: ICollection[];
  onClickItem: (item: ICollection) => void;
  onEndReach?: () => void;
}

const List = (props: IListProps) => {
  const { isFetching, collections, onClickItem } = props;
  const columns: ColumnsType<ICollection> = [
    {
      key: 'index',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText">
          {index + 1}
        </p>
      ),
      responsive: ['md'],
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'left' }}>
          #
        </div>
      ),
    },
  ];

  return (
    <ListStyled>
      {isFetching && collections.length <= 0 ? (
        <CollectionLoader />
      ) : (
        <Table
          columns={columns}
          dataSource={collections}
          size="large"
          // loading={isFetching && collections.length === 0}
          pagination={false}
          rowClassName="tableRow"
          onRow={(collection) => ({
            onClick: () => {
              onClickItem(collection);
            },
          })}
        />
      )}
    </ListStyled>
  );
};

export default React.memo(List);
