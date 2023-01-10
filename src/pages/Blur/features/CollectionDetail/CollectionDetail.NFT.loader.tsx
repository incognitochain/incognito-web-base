/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const CollectionDetailNFTLoader = () => (
  <React.Fragment>
    <ContentLoader
      style={{ marginTop: 16 }}
      height={400}
      width="100%"
      speed={1}
      backgroundColor={'#333'}
      foregroundColor={'#999'}
    >
      <rect x="0" y="0" rx="16" ry="16" width="100%" height="100%" />
      <rect x="328" y="0" rx="16" ry="16" width="100%" height="100%" />
      <rect x="656" y="0" rx="16" ry="16" width="100%" height="100%" />
      <rect x="980" y="0" rx="16" ry="16" width="100%" height="100%" />
    </ContentLoader>
  </React.Fragment>
);

export default CollectionDetailNFTLoader;
