import { ColumnType, SortOrder } from 'antd/es/table/interface';
import arrowBottomActive from 'assets/svg/arrow-bottom-active.svg';
import arrowDisable from 'assets/svg/arrow-disable.svg';
import arrowTopActive from 'assets/svg/arrow-top-active.svg';
import ImagePlaceholder from 'components/ImagePlaceholder';
import debounce from 'lodash/debounce';
import { ICollection } from 'pages/Blur';
import EthereumLogo from 'pages/Blur/images/ether.svg';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import { getSearchURL } from '../CollectionDetail';
import CollectionLoader from './Collection.loader';
import { CollectionItem, ContainerListStyled, ListStyled } from './Collection.styled';

interface IListProps {
  isFetching: boolean;
  collections: ICollection[];
  fetchCollections: ({ page }: { page: number }) => void;
}
interface ILabel {
  text: string;
  numb: number;
  className?: string;
}

interface ITbHeader {
  sortColumns?: {
    column: ColumnType<ICollection>;
    order: SortOrder;
  }[];
  title: string;
  key?: string;
}

const HEADER_LIST = [
  { text: 'Floor price' },
  { text: 'Top Bid', className: 'medium-hide' },
  { text: '1D Change' },
  { text: '7D Change' },
  { text: '15M Volume', className: 'medium-hide' },
  { text: '1D Volume' },
  { text: '7D Volume' },
  { text: 'Owners', className: 'medium-hide' },
  { text: 'Supply', className: 'medium-hide' },
];

const getColor = ({ numb, value, suffix }: { numb: number; value: string; suffix?: string }) => {
  const text = Number.isFinite(numb) ? `${value}${suffix || ''}` : '-';
  const color = !Number.isFinite(numb) ? '#9C9C9C' : numb < 0 ? '#FD4040' : '#0ECB81';
  return { text, color };
};

const CurrencyIcon = <img className="currency-logo" src={EthereumLogo} alt="currency-logo" />;

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

const renderItem = (collection: ICollection, index: number, history: any) => {
  return (
    <CollectionItem
      key={collection.id}
      onClick={() => history.push(getSearchURL({ slug: collection.collectionSlug }))}
      effectHover={true}
    >
      <div className="wrap-index">
        <p key={index.toString()} className="content-label">
          {index + 1}
        </p>
      </div>
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

const List = (props: IListProps) => {
  const { isFetching, collections, fetchCollections } = props;
  const showLoader = isFetching && collections.length <= 0;
  const history = useHistory();

  const renderSortableTitle = ({ sortColumns, title, key }: ITbHeader) => {
    const sortedColumn = sortColumns?.find(({ column }: any) => column.key === key);
    return (
      <div className="headerTitle" style={{ justifyContent: 'center', cursor: 'pointer' }}>
        {title}
        {sortedColumn ? (
          sortedColumn.order === 'ascend' ? (
            <img alt="" src={arrowBottomActive} style={{ marginLeft: 6, marginRight: 0 }} />
          ) : sortedColumn?.order === 'descend' ? (
            <img alt="" src={arrowTopActive} style={{ marginLeft: 6, marginRight: 0 }} />
          ) : (
            <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
          )
        ) : (
          <img alt="" src={arrowDisable} style={{ marginLeft: 6, marginRight: 0 }} />
        )}
      </div>
    );
  };

  const renderNormalHeader = ({ text, className }: { text: string; className?: string }) => {
    return (
      <div className={`wrap-header ${className || ''}`} key={text}>
        <p className="header-label">{text}</p>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <CollectionItem effectHover={false}>
        <div className="wrap-index">
          <p className="header-index-label">#</p>
        </div>
        <div className="wrap-name" style={{ marginRight: 75 }}>
          <p className="content-label header-name">Collection</p>
        </div>
        {HEADER_LIST.map(renderNormalHeader)}
      </CollectionItem>
    );
  };

  const onLoadMoreCollections = () => {
    if (isFetching || typeof fetchCollections !== 'function') return;
    const nextPage = Math.floor(collections.length / 100) + 1;
    fetchCollections({ page: nextPage });
  };

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <ContainerListStyled>
      {showLoader && <CollectionLoader />}
      <ListStyled showLoader={showLoader}>
        {renderHeader()}
        <InfiniteScroll
          dataLength={collections.length}
          next={debounceLoadMore}
          hasMore={true}
          loader={<div />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {collections.map((item, index) => renderItem(item, index, history))}
        </InfiniteScroll>
      </ListStyled>
    </ContainerListStyled>
  );
};

export default React.memo(List);
