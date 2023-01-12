/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import {
  actionFetchCollectionTokens,
  clearSelectedTokens,
  IToken,
  selectedTokensSelector,
  selectMaxBuyTokens,
  tokensSelector,
} from 'pages/Blur';
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
  const selectedTokens = useSelector(selectedTokensSelector);

  const [keySearch, setKeySearch] = React.useState<string | undefined>();
  const [currentSortType, setCurrentSortType] = React.useState<SortBlurNftType>(SortBlurNftType.PriceLowToHigh);

  React.useEffect(() => {
    dispatch(actionFetchCollectionTokens(slug));
  }, []);

  const onChangeSearch = (e: any) => {
    setKeySearch(e.target.value);
  };

  const onCheckManyItems = () => {
    dispatch(selectedTokens.length > 0 ? clearSelectedTokens() : selectMaxBuyTokens());
  };

  const onClickTokenItem = (token: IToken) => {
    let newToken = token;
    newToken.isSelected = !newToken.isSelected;
    dispatch(actionUpdateToken(newToken));
  };

  return (
    <Styled>
      <CollectionDetailFilter
        totalToken={tokens.length}
        totalSelectedToken={selectedTokens.length}
        keySearch={keySearch}
        onSearchChange={onChangeSearch}
        sortBlurNftType={currentSortType}
        onChangeBlurNftType={(type) => setCurrentSortType(type)}
        onCheckManyItems={onCheckManyItems}
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
