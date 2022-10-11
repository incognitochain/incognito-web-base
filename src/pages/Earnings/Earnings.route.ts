import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/earnings';

const EarningsRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Earnings')),
  name: 'Earnings',
  to: route,
};

export default EarningsRoute;
