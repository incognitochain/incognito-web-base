import { pOpenseaTranslateSelector } from 'config/Configs.selector';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import POpenseaListCollection from './components/POpensea.listCollection';
import POpenseaSubRoute from './components/POpensea.subRoute';
import { Styled, WrapperContent } from './POpensea.styled';

const renderSectionBottom = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pOpenseaStr = useSelector(pOpenseaTranslateSelector);

  return (
    <WrapperContent>
      <POpenseaSubRoute />
      <h3 className="fw-bold" style={{ textAlign: 'left' }}>
        {pOpenseaStr.mainTitle}
      </h3>
      <POpenseaListCollection />
    </WrapperContent>
  );
};

const Home = () => {
  return <Styled className="default-max-width">{renderSectionBottom()}</Styled>;
};

export default memo(Home);
