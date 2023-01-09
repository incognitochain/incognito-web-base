/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const POpenseaListCollectionLoader = ({ repeat = 2 }: { repeat?: number }) => (
  <React.Fragment>
    {[...Array(repeat).keys()].map((index) => (
      <ContentLoader
        key={index.toString()}
        style={{ marginTop: '24px' }}
        height={54}
        width={1400}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 1400 54"
      >
        <rect x="20" y="10" rx="4" ry="4" width="55" height="16" />
        <rect x="110" y="10" rx="4" ry="4" width="200" height="16" />
        <rect x="370" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="540" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="700" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="860" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="1020" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="1170" y="10" rx="4" ry="4" width="70" height="16" />
      </ContentLoader>
    ))}
  </React.Fragment>
);

export default POpenseaListCollectionLoader;
