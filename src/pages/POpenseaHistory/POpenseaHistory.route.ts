import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/papps/popensea/history';

const POpenseaAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./POpenseaHistory.home')),
  name: 'pOpensea',
  to: route,
};

export default POpenseaAppRoute;
