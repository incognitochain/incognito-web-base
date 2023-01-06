/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const POpenseaListCollectionLoader = ({ repeat = 20 }: { repeat?: number }) => (
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
        <rect x="138" y="10" rx="4" ry="4" width="356" height="16" />
        <rect x="690" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="850" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="1010" y="10" rx="4" ry="4" width="70" height="16" />
        <rect x="1160" y="10" rx="4" ry="4" width="70" height="16" />
      </ContentLoader>
    ))}
  </React.Fragment>
);

export default POpenseaListCollectionLoader;
