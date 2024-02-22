import { peggingAppTranslateSelector } from 'config/Configs.selector';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import Apps from './features/Apps';
import Header from './features/Header';
import { Styled, WrapperContent } from './PeggingApp.styled';

const renderSectionBottom = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const peggingTrs = useSelector(peggingAppTranslateSelector);
  return (
    <WrapperContent>
      <div className="header-menu">
        <div>Anonymous</div>
        <div>Permissionless</div>
        <div>Trustless</div>
      </div>
      <h3 className="fw-bold" style={{ textAlign: 'center' }}>
        {peggingTrs.mainTitle}
      </h3>
      <p className="h7 sub-header-text">
        Incognito keeps your dapp usage history private with{' '}
        <span style={{ color: 'white' }}>zero-knowledge proofs</span>. Now you can buy, trade and spend crypto
        privately, and other people won’t see your activity on the blockchain.
      </p>
      <Apps />
    </WrapperContent>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <Styled className="default-max-width">{renderSectionBottom()}</Styled>
    </>
  );
};

export default memo(Home);
