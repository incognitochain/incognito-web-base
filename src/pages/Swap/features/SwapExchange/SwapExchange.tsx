import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { changeTab } from 'components/Core/Tabs/Tabs.reducer';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import { FormDeposit } from 'pages/Swap/features/FormDeposit';
import { FormUnshield } from 'pages/Swap/features/FormUnshield';
import enhance from 'pages/Swap/Swap.enhance';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { Container, Content } from './SwapExchange.styled';

const SwapExchange = (props: any) => {
  const { SWAP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);
  const isFetching = useAppSelector(isFetchingTokenSelector);
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const renderForm = () => {
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
      <Content>{isFetching ? <Loader /> : renderContent()}</Content>
    </Container>
  );
};

export default enhance(SwapExchange);
