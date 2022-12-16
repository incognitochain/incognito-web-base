import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/swap';

const MarketRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Market')),
  name: 'Swap',
  to: route,
};

export default MarketRoute;
