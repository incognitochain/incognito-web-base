import ImagePlaceholder from 'components/ImagePlaceholder';
import { ICollection } from 'pages/Pnft';
import { getSearchURL } from 'pages/Pnft/features/CollectionDetail';
import EthereumLogo from 'pages/Pnft/images/ether.svg';
import React from 'react';

import { HEADER_LIST } from './Collections.constant';
import { CollectionItem } from './Collections.styled';
import { ILabel } from './Collections.types';

const getColor = ({ numb, value, suffix }: { numb: number; value: string; suffix?: string }) => {
  const text = Number.isFinite(numb) ? `${value}${suffix || ''}` : '-';
  const color = !Number.isFinite(numb) ? '#9C9C9C' : numb < 0 ? '#FD4040' : '#0ECB81';
  return { text, color };
};

const CurrencyIcon = (
  <img className="currency-logo" src={EthereumLogo} alt="currency-logo" style={{ marginRight: -10 }} />
);

const renderLabelWithIcon = ({ text, numb, className }: ILabel) => {
  text = numb ? text : '-';
  let icon: any = CurrencyIcon;
  if (!text || text === '0' || text === '-') {
    text = '-';
    icon = undefined;
  }
  return (
    <div className={`wrap-item align-end ${className || ''}`}>
      <p className={`content-label ${!icon ? 'shadow-text' : ''}`}>{`${text}`}</p>
      {icon && icon}
    </div>
  );
};

const renderLabelWithColor = ({ numb, text, className }: { numb: number; text: string; className?: string }) => {
  const { text: value, color } = getColor({ numb, value: text, suffix: '%' });
  return (
    <div className={`wrap-item align-end ${className}`}>
      <p className="content-label" style={{ color }}>
        {value}
      </p>
    </div>
  );
};

const renderLabelNormal = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div className={`wrap-item align-end ${className || ''}`}>
      <p className="content-label">{value}</p>
    </div>
  );
};

const renderItem = ({
  collection,
  index,
  history,
  removeIndex = false,
}: {
  collection: ICollection;
  index: number;
  history: any;
  removeIndex?: boolean;
}) => {
  return (
    <CollectionItem
      key={collection.id}
      onClick={() => history.push(getSearchURL({ slug: collection.collectionSlug }))}
      effectHover={true}
      className="collection-item"
    >
      {!removeIndex && (
        <div className="wrap-index">
          <p key={index.toString()} className="content-label">
            {index + 1}
          </p>
        </div>
      )}
      <div className="wrap-name">
        <ImagePlaceholder className="logo" src={collection.imageUrl} />
        <p key={index.toString()} className="content-label name">
          {collection.name}
        </p>
      </div>
      {renderLabelWithIcon({
        text: collection.floorPrice.amountFormated,
        numb: collection.floorPrice.amountNum,
      })}
      {renderLabelWithIcon({
        text: collection.bestCollectionBid.amountFormated,
        numb: collection.bestCollectionBid.amountNum,
        className: 'medium-hide',
      })}
      {renderLabelWithColor({
        numb: collection.dayChangeNumb,
        text: collection.dayChange,
      })}
      {renderLabelWithColor({
        numb: collection.weekChangeNumb,
        text: collection.weekChange,
      })}
      {renderLabelWithIcon({
        text: collection.volumeFifteenMinutes.amountFormated,
        numb: collection.volumeFifteenMinutes.amountNum,
        className: 'medium-hide',
      })}
      {renderLabelWithIcon({
        text: collection.volumeOneDay.amountFormated,
        numb: collection.volumeOneDay.amountNum,
      })}
      {renderLabelWithIcon({
        text: collection.volumeOneWeek.amountFormated,
        numb: collection.volumeOneWeek.amountNum,
      })}
      {renderLabelNormal({
        value: `${collection.numberOwnersFormated} (${collection.numberOwnersPercent}%)`,
        className: 'medium-hide',
      })}
      {renderLabelNormal({
        value: collection.totalSupplyFormated,
        className: 'medium-hide',
      })}
    </CollectionItem>
  );
};

const renderNormalHeader = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`wrap-header ${className || ''}`} key={text}>
      <p className="header-label">{text}</p>
    </div>
  );
};

const renderHeader = ({ removeIndex }: { removeIndex: boolean }) => {
  return (
    <CollectionItem effectHover={false}>
      {!removeIndex && (
        <div className="wrap-index">
          <p className="header-index-label">#</p>
        </div>
      )}
      <div className="wrap-name" style={{ marginRight: 75 }}>
        <p className="content-label header-name">Collection</p>
      </div>
      {HEADER_LIST.map(renderNormalHeader)}
    </CollectionItem>
  );
};

export { CurrencyIcon, getColor, renderHeader, renderItem, renderLabelWithColor, renderLabelWithIcon };
