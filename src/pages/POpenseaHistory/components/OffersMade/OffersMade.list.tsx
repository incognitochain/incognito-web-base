import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ImagePlaceholder from 'components/ImagePlaceholder';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';

// import POpenseaOffersMadeLoader from './OffersMade.list.loader';
import { Styled } from './OffersMade.list.styled';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

interface POpenseaOffersMadeProps {}

const POpenseaListCollection = (props: POpenseaOffersMadeProps) => {
  const {} = props;

  const columns: ColumnsType<any> = [
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
            <ImagePlaceholder className="logo" src={''} />
            <p className="baseText" style={{ marginLeft: 24 }}>
              NFT Name
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
          340 ETH
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Unit Price
        </div>
      ),
    },
    {
      key: 'floor-difference',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText text-align-center">
          100$ below
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Floor Difference
        </div>
      ),
    },
    {
      key: 'expiration',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText text-align-center">
          3 days
        </p>
      ),
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
          {timeAgo.format(Date.now() - 1.5 * 60 * 1000, 'round')}
        </p>
      ),
      title: () => (
        <div className="headerTitle" style={{ justifyContent: 'center' }}>
          Made
        </div>
      ),
    },
    {
      key: 'status',
      render: (text, record, index) => (
        <p key={index.toString()} className="baseText text-align-center">
          Valid
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
      render: (text, record, index) => (
        <div key={index.toString()} className="cancel-btn">
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
      {/* {<POpenseaOffersMadeLoader />} */}
      <Table
        // style={{ opacity: isFetching && collections.length <= 0 ? 0 : 1 }}
        columns={columns}
        dataSource={[1]}
        size="large"
        pagination={false}
        rowClassName="tableRow"
      />
    </Styled>
  );
};

export default React.memo(POpenseaListCollection);
