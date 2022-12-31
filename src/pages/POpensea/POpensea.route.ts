import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/popensea';

const POpenseaAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./POpensea.home')),
  name: 'pOpensea',
  to: route,
};

export default POpenseaAppRoute;
