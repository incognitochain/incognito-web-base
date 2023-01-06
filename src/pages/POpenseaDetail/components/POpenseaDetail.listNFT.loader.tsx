/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';
import ContentLoader from 'react-content-loader';

const POpenseaDetailListNFTLoader = ({ repeat = 10 }: { repeat?: number }) => (
  <React.Fragment>
    {[...Array(repeat).keys()].map((index) => (
      <ContentLoader
        key={index.toString()}
        style={{ marginTop: index === 0 ? '8px' : '32px' }}
        height={390}
        width={1400}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 1400 390"
      >
        <rect x="0" y="0" rx="16" ry="16" width="300" height="390" />
        <rect x="328" y="0" rx="16" ry="16" width="300" height="390" />
        <rect x="656" y="0" rx="16" ry="16" width="300" height="390" />
        <rect x="980" y="0" rx="16" ry="16" width="300" height="390" />
      </ContentLoader>
    ))}
  </React.Fragment>
);

export default POpenseaDetailListNFTLoader;
