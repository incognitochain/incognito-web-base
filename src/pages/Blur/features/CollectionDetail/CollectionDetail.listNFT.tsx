/* eslint-disable jsx-a11y/alt-text */
import { Button, List } from 'antd';
import ImagePlaceholder from 'components/ImagePlaceholder';
import {
  actionFetchCollectionTokens,
  actionFetchMoreCollectionTokens,
  IToken,
  lastTokenSelector,
  tokensSelector,
} from 'pages/Blur';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';

import { Styled } from './CollectionDetail.listNFT.styled';
import CollectionDetailNFTLoader from './CollectionDetail.NFT.loader';

interface CollectionDetailListNFTProps {
  slug: string;
}

const CollectionDetailListNFT = (props: CollectionDetailListNFTProps) => {
  const { slug } = props;

  const tokens = useSelector(tokensSelector);
  const lastToken = useSelector(lastTokenSelector);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(actionFetchCollectionTokens(slug));
  }, []);

  const onLoadMore = () => {
    lastToken && dispatch(actionFetchMoreCollectionTokens(slug, lastToken));
  };

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  );

  return (
    <Styled>
      <div className="filter-container">
        <div className="total-container">
          <p className="total-items">Items</p>
          <p className="total-number">{`(${tokens.length} items)`}</p>
        </div>
      </div>
      <List
        className="list"
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={tokens}
        loadMore={loadMore}
        renderItem={(item: IToken, index: number) => {
          const { detail } = item;
          return (
            <List.Item key={index.toString()} onClick={() => {}}>
              {item.isLoading ? (
                <CollectionDetailNFTLoader />
              ) : (
                <div className="card">
                  <ImagePlaceholder className="item-img" src={detail.imageUrl} />
                  <div className="item-info">
                    <div className="item-name-container">
                      <p className="item-name">{detail.name}</p>
                    </div>
                    <p className="item-price">
                      {detail.price.amountFormated}
                      {` ${detail.price.unit}`}
                    </p>

                    <p className="item-last-sale">
                      Last sale: {detail.lastSale.amountFormated}
                      {` ${detail.lastSale.unit}`}
                    </p>
                  </div>
                </div>
              )}
            </List.Item>
          );
        }}
      />
    </Styled>
  );
};

export default React.memo(CollectionDetailListNFT);
