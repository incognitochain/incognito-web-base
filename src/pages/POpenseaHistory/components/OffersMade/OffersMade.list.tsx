import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CopyIcon from 'components/Copy';
import Row from 'components/Core/Row';
import ImagePlaceholder from 'components/ImagePlaceholder';
import { useModal } from 'components/Modal';
import OpenLink from 'components/OpenLink';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemedText } from 'theme';
import { ellipsisCenter } from 'utils';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';

import { IOffersMadeAction, OffersMadeAction } from './OffersMade.action';
import { IPOpenseaOfferMade, OfferStatus } from './OffersMade.interface';
import POpenseaListOfferLoader from './OffersMade.list.loader';
// import POpenseaOffersMadeLoader from './OffersMade.list.loader';
import { Styled } from './OffersMade.list.styled';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

interface POpenseaOffersMadeProps {}

const POpenseaListCollection = (props: POpenseaOffersMadeProps) => {
  const dispatch = useDispatch();
  const { setModal, clearAllModal } = useModal();

  const [isFetching, setIsFetching] = useState(false);
  const [offersMade, setOffersMade] = useState<IPOpenseaOfferMade[]>([]);

  const offerMadesActions: IOffersMadeAction = new OffersMadeAction({
    component: {
      setIsFetching,
      setOffersMade,
      setModal,
      clearAllModal,
    },
    dispatch,
  });

  useEffect(() => {
    offerMadesActions.getOffersMade();
  }, []);

  const columns: ColumnsType<IPOpenseaOfferMade> = [
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
    {
      key: 'Offer',
      render: (text, record, index) => (
        <div key={index.toString()} className="offer-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ImagePlaceholder className="logo" src={record.nftImg} animationUrl={record.nftAnimationUrl} />
            <p className="baseText" style={{ marginLeft: 24 }}>
              {record.nftName}
            </p>
          </div>
        </div>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'left' }}>
          Offer
        </div>
      ),
    },
    {
      key: 'unit-price',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText text-align-center">
          {record.offerAmountText}
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Unit Price
        </div>
      ),
    },
    {
      key: 'expiration',
      render: (text, record, index) => {
        let diffText = '';
        const diffHours = Math.round(moment(record.offerTime).diff(moment(record.createTime), 'hours', true));
        if (diffHours < 24) {
          diffText = diffHours + ' hours';
        } else {
          diffText = Math.round(moment(record.offerTime).diff(moment(record.createTime), 'days', true)) + ' days';
        }
        return (
          <p key={index.toString()} className="baseText text-align-center">
            {diffText}
          </p>
        );
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Expiration
        </div>
      ),
    },
    {
      key: 'made',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText text-align-center">
          {timeAgo.format(record.createTime, 'round')}
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Made
        </div>
      ),
    },
    {
      key: 'request-tx',
      render: (text, record, index) => {
        const offerTx = record.offerIncTx;
        const link = offerTx
          ? `${getExplorerLink(PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO, offerTx, ExplorerDataType.TRANSACTION)}`
          : undefined;
        const handleOpenLink = () => window.open(link);
        return (
          <Row className="request-tx">
            <ThemedText.SmallLabel className="baseText text-align-center">
              {offerTx && ellipsisCenter({ str: offerTx, limit: 3 })}
            </ThemedText.SmallLabel>

            {!!offerTx && <CopyIcon text={offerTx} size={20} />}
            {!!link && <OpenLink onClick={handleOpenLink} />}
          </Row>
        );
      },
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          RequestTx
        </div>
      ),
    },
    {
      key: 'status',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText status-text text-align-center">
          {record.status ? record.status : 'invalid'}
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Status
        </div>
      ),
    },
    {
      key: 'action',
      render: (text, record, index) =>
        record.status === OfferStatus.pending && (
          <div key={index.toString()} className="cancel-btn" onClick={() => offerMadesActions.cancelOffer(record)}>
            <p className="cancel-txt">Cancel</p>
          </div>
        ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Action
        </div>
      ),
    },
  ];

  return (
    <Styled>
      {isFetching && <POpenseaListOfferLoader />}
      <Table
        style={{ opacity: isFetching && offersMade.length <= 0 ? 0 : 1 }}
        columns={columns}
        dataSource={offersMade}
        size="large"
        pagination={false}
        rowClassName="tableRow"
      />
    </Styled>
  );
};

export default React.memo(POpenseaListCollection);
