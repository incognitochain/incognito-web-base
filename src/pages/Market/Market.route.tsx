import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/';

const MarketRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Market')),
  name: 'Market',
  to: route,
};

export default MarketRoute;
