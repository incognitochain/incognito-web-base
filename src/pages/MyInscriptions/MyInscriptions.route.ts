import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/my-inscriptions';

const MyInscriptionsRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./MyInscriptions.home')),
  name: 'my-inscriptions',
  to: route,
};

export default MyInscriptionsRoute;
