/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import { actionFetchCollectionTokens, IToken, tokensSelector } from 'pages/Blur';
import { actionUpdateToken } from 'pages/Blur/Blur.actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';

import CollectionDetailFilter, { SortBlurNftType } from './CollectionDetail.filter';
import { Styled } from './CollectionDetail.listNFT.styled';
import NFTItem from './CollectionDetail.NFT.item';

interface CollectionDetailListNFTProps {
  slug: string;
}

const CollectionDetailListNFT = (props: CollectionDetailListNFTProps) => {
  const { slug } = props;
  const dispatch = useAppDispatch();

  const tokens = useSelector(tokensSelector);

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentSortType, setCurrentSortType] = React.useState<SortBlurNftType>(SortBlurNftType.PriceLowToHigh);

  const onChangeSearch = (e: any) => {
    setKeySearch(e.target.value);
  };

  React.useEffect(() => {
    dispatch(actionFetchCollectionTokens(slug));
  }, []);

  const onClickTokenItem = (token: IToken) => {
    let newToken = token;
    newToken.isSelected = !newToken.isSelected;
    dispatch(actionUpdateToken(newToken));
  };

  return (
    <Styled>
      <CollectionDetailFilter
        total={tokens.length}
        keySearch={keySearch}
        onSearchChange={onChangeSearch}
        sortBlurNftType={currentSortType}
        onChangeBlurNftType={(type) => setCurrentSortType(type)}
      />
      <List
        className="list"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={tokens}
        renderItem={(item: IToken, index: number) => (
          <NFTItem key={index.toString()} token={item} onClickTokenItem={onClickTokenItem} />
        )}
      />
    </Styled>
  );
};

export default React.memo(CollectionDetailListNFT);
