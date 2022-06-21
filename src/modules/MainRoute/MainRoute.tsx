import withStarted from '@modules/MainRoute/MainRoute.getStarted';
import { ErrorBoundary } from '@src/components';
import { IRouteProps } from '@src/modules';
import React from 'react';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { compose } from 'recompose';
import styled, { ITheme } from 'styled-components';

import enhance from './MainRoute.enhance';
import { IProps } from './MainRoute.inteface';
const Styled = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainRoute = (props: IProps & any) => {
  const { routes } = props;
  return (
    <ErrorBoundary>
      <Styled>
        <Switch>
          {routes.map((route: IRouteProps) => (
            <Route {...route} key={route.path} />
          ))}
        </Switch>
      </Styled>
    </ErrorBoundary>
  );
};

export default compose(enhance, withStarted)(React.memo(MainRoute));
