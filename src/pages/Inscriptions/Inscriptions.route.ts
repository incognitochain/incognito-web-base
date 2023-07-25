import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/inscriptions';

const InscriptionsRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Inscriptions.home')),
  name: 'Inscriptions',
  to: route,
};

export default InscriptionsRoute;
