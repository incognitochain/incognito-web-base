import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/';

const HomeRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Home')),
  name: 'Home',
  to: route,
};

export default HomeRoute;
