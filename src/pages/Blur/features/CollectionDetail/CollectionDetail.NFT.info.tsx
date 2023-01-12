/* eslint-disable jsx-a11y/alt-text */
import { RowBetween } from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { IToken } from 'pages/Blur';
import React from 'react';
import styled from 'styled-components/macro';

const INFO_WIDTH = 600;
const INFO_HEIGHT = 340;

const Styled = styled.div<{ x: number; y: number; width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: #303030;
  border-radius: 16px;

  display: flex;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;

  .wrap-content {
    display: flex;
    flex-direction: row;
    padding: 24px;
  }
`;

const StyledCard = styled.div`
  border-radius: 8px;
  cursor: pointer;

  .item-img {
    width: 200px;
    height: 200px;
    height: auto;
    object-fit: cover;
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 8px;
  }

  .item-info {
    background-color: ${({ theme }) => theme.bg3};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 8px;
  }

  .item-name-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
  }

  .item-price {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    margin-top: 8px;
  }

  .text-align-right {
    text-align: right;
  }

  .item-last-sale {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-top: 4px;
    height: 16px;
    color: ${({ theme }) => theme.primary8};
  }

  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

interface NFTInfoProps {
  event: any;
  token: IToken;
}

const NFTInfoOverlay = (props: NFTInfoProps) => {
  const { event, token } = props;

  const { detail } = token;
  const { screenX, screenY, pageX, pageY } = event;

  let x = pageX;
  let y = pageY + 16;
  if (screenX / 1.75 < pageX + INFO_WIDTH) {
    x = x - INFO_WIDTH;
  }

  const renderCardInfo = () => (
    <StyledCard>
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
            <p className="item-price text-align-right">
              {detail.lastSale.amountFormated}
              {` ${detail.lastSale.unit}`}
            </p>
          </div>
        </RowBetween>
      </div>
    </StyledCard>
  );

  const renderTable = () => {
    return <div></div>;
  };

  return (
    <Styled x={x} y={y} width={INFO_WIDTH} height={INFO_HEIGHT}>
      <div className="wrap-content">
        {renderCardInfo()}
        {renderTable()}
      </div>
    </Styled>
  );
};

export default React.memo(NFTInfoOverlay);
