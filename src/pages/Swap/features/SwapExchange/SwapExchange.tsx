import { Row } from 'antd';
import Loader from 'components/Core/Loader';
import { FormUnshield } from 'pages/Swap/features/FormUnshield';
import enhance from 'pages/Swap/Swap.enhance';
import { getQueryPAppName } from 'pages/Swap/Swap.hooks';
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { isFetchingSelectors as isFetchingTokenSelector } from 'state/token';

import { capitalizeFirstLetter } from '../ItemDetail/ItemDetail';
import { getExchangeLogo } from '../Selection/SelectSwapExchange';
import { Container, Content } from './SwapExchange.styled';

const SwapExchange = (props: any) => {
  const isFetching = useAppSelector(isFetchingTokenSelector);

  const renderForm = () => {
    return <FormUnshield {...props} />;
  };

  const renderContent = () => {
    const query = getQueryPAppName();
    const name = query?.pAppName || '';
    const appName = name === 'joe' ? 'TraderJoe' : name === 'pdex' ? 'Incognito DEX' : name;
    return (
      <>
        <Row>
          <img
            className="logo"
            alt=""
            src={getExchangeLogo(appName)}
            style={{ width: 28, height: 28, marginRight: 12 }}
          />
          <p className="h7" style={{ color: 'white', fontWeight: 600, fontSize: 20, lineHeight: '140%' }}>{`${
            appName === 'Incognito DEX' ? '' : 'p'
          }${capitalizeFirstLetter(appName)}`}</p>
        </Row>
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
