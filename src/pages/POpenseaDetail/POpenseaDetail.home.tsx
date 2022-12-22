import React, { memo } from 'react';

import POpenseaDetailListNFT from './components/POpenseaDetail.listNFT';
import POpenseaDetailOverview from './components/POpenseaDetail.overview';
import POpenseaDetailSubRoute from './components/POpenseaDetail.subRoute';
import { Styled, WrapperContent } from './POpenseaDetail.styled';

const renderSectionBottom = () => {
  return (
    <WrapperContent>
      <POpenseaDetailSubRoute collectionName={'collectionName'} />
      <POpenseaDetailOverview />
      <POpenseaDetailListNFT />
    </WrapperContent>
  );
};

const Home = () => {
  return <Styled className="default-max-width">{renderSectionBottom()}</Styled>;
};

export default memo(Home);
