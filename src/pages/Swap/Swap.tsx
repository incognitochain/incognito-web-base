import { Row } from 'antd';
import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { changeTab } from 'components/Core/Tabs/Tabs.reducer';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { FormDeposit } from './features/FormDeposit';
import { FormUnshield } from './features/FormUnshield';
import ArrowLeftImg from './images/arrow-left.png';
import PigImg from './images/pig.png';
import enhance from './Swap.enhance';
import { Container, LeftColumn, RightColumn } from './Swap.styled';

const Swap = (props: any) => {
  const { SWAP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);
  const isFetching = useAppSelector(isFetchingTokenSelector);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const renderForm = () => {
    // Deposit
    if (selectedTab === HEADER_TAB.tabNames[1]) return <FormDeposit {...props} />;
    return <FormUnshield {...props} />;
  };

  const renderContent = () => (
    <>
      <Tabs {...HEADER_TAB} />
      {renderForm()}
    </>
  );

  React.useEffect(() => {
    if (location?.state?.tokenId1 && location?.state?.tokenId2) {
      dispatch(changeTab({ tab: TAB_LIST.SWAP.tabNames[0], rootTab: TAB_LIST.SWAP.rootTab }));
    }
  }, [location?.state?.tokenId1, location?.state?.tokenId2]);

  return (
    <Container className="default-max-width">
      <LeftColumn>
        <h3>The easiest way to anonymously buy, trade, and hold 100+ cryptocurrencies.</h3>
        <Row>
          <Row className="wrap-item provide-item" onClick={() => history.push('/earnings')}>
            <img src={PigImg} className="pig-image" />
            <p className="h8 provide-text">Provide liquidity and earn</p>
            <img src={ArrowLeftImg} className="arrow-image" />
          </Row>
          {/*<Row className="wrap-item watch-item">*/}
          {/*  <WatchIcon />*/}
          {/*  <p className="h8">See how it works</p>*/}
          {/*</Row>*/}
        </Row>
      </LeftColumn>
      <RightColumn className="token-extra">{isFetching ? <Loader /> : renderContent()}</RightColumn>
    </Container>
  );
};

export default enhance(Swap);
