import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/apps';

const PeggingAppRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./PeggingApp.home')),
  name: 'Apps',
  to: route,
};

export default PeggingAppRoute;
