import Loader from 'components/Core/Loader';
import { FormUnshield } from 'pages/Swap/features/FormUnshield';
import enhance from 'pages/Swap/Swap.enhance';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { capitalizeFirstLetter } from '../ItemDetail/ItemDetail';
import { Container, Content } from './SwapExchange.styled';

const SwapExchange = (props: any) => {
  const isFetching = useAppSelector(isFetchingTokenSelector);

  const renderForm = () => {
    return <FormUnshield {...props} />;
  };

  const renderContent = () => {
    const query = getQueryPAppName();
    return (
      <>
        <p
          className="h7"
          style={{ color: 'white', fontWeight: 600, fontSize: 20, lineHeight: '140%' }}
        >{`p${capitalizeFirstLetter(query?.pAppName || '')}`}</p>
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
