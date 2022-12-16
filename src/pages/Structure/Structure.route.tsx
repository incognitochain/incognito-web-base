import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/mine';

const StructureRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Structure')),
  name: 'mine',
  to: route,
};

export default StructureRoute;
