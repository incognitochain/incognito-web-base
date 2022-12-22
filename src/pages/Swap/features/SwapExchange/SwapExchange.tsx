import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { selectedTabSelector } from 'components/Core/Tabs/Tabs.selectors';
import { FormUnshield } from 'pages/Swap/features/FormUnshield';
import enhance from 'pages/Swap/Swap.enhance';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { getQueryPAppName } from '../../Swap.hooks';
import { capitalizeFirstLetter } from '../ItemDetail/ItemDetail';
import { Container, Content } from './SwapExchange.styled';

const SwapExchange = (props: any) => {
  let { SWAP_PAPP: HEADER_TAB } = TAB_LIST;
  const selectedTab = useAppSelector(selectedTabSelector)(HEADER_TAB.rootTab);
  const isFetching = useAppSelector(isFetchingTokenSelector);
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const renderForm = () => {
    // if (selectedTab === HEADER_TAB.tabNames[1]) return <FormDeposit {...props} />;
    return <FormUnshield {...props} />;
  };

  const renderContent = () => {
    const query = getQueryPAppName();
    if (query.isValid && query.pAppName) {
      HEADER_TAB = { ...HEADER_TAB, tabNames: [`p${capitalizeFirstLetter(query.pAppName)}`] };
    }
    return (
      <>
        <Tabs {...HEADER_TAB} />
        {renderForm()}
      </>
    );
  };

  return (
    <Container className="default-max-width">
      <Content>{isFetching ? <Loader /> : renderContent()}</Content>
    </Container>
  );
};

export default enhance(SwapExchange);
