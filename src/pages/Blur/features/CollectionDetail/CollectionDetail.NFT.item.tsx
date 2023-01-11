/* eslint-disable jsx-a11y/alt-text */
import { List } from 'antd';
import { RowBetween } from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { IToken } from 'pages/Blur';
import Checkbox from 'pages/Blur/images/checkbox.svg';
import CheckboxActive from 'pages/Blur/images/checkbox-active.svg';
import React from 'react';

import { StyledCard } from './CollectionDetail.listNFT.styled';
import CollectionDetailNFTLoader from './CollectionDetail.NFT.loader';

interface NFTItemProps {
  key: string;
  token: IToken;
  onClickTokenItem: (item: IToken) => void;
}

const NFTItem = (props: NFTItemProps) => {
  const { token, onClickTokenItem, key } = props;
  const { detail } = token;

  return (
    <List.Item key={key} onClick={() => onClickTokenItem(token)}>
      {token.isLoading ? (
        <CollectionDetailNFTLoader />
      ) : (
        <StyledCard isSelected={token.isSelected}>
          <ImagePlaceholder className="item-img" src={detail.imageUrl} />
          <div className="item-info">
            <div className="item-name-container">
              <p className="item-name">{detail.name}</p>
            </div>
            <RowBetween>
              <div>
                <p className="item-last-sale">Price</p>
                <p className="item-price">
                  {detail.price.amountFormated}
                  {` ${detail.price.unit}`}
                </p>
              </div>
              <div>
                <p className="item-last-sale text-align-right">Last sale</p>
                <p className="ope text-align-right">
                  {detail.lastSale.amountFormated}
                  {` ${detail.lastSale.unit}`}
                </p>
              </div>
            </RowBetween>
          </div>
          <img className="checkbox" src={token.isSelected ? CheckboxActive : Checkbox} alt="checkbox-logo" />
        </StyledCard>
      )}
    </List.Item>
  );
};

export default React.memo(NFTItem);
