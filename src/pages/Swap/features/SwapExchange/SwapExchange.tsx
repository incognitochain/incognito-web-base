import Loader from 'components/Core/Loader';
import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import { FormUnshield } from 'pages/Swap/features/FormUnshield';
import enhance from 'pages/Swap/Swap.enhance';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { capitalizeFirstLetter } from '../ItemDetail/ItemDetail';
import { Container, Content } from './SwapExchange.styled';

const SwapExchange = (props: any) => {
  let { SWAP_PAPP: HEADER_TAB } = TAB_LIST;
  const isFetching = useAppSelector(isFetchingTokenSelector);

  const renderForm = () => {
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
