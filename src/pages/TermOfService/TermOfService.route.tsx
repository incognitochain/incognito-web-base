import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/term-of-service';

const TermOfServiceRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./TermOfService')),
  name: 'TermOfService',
  to: route,
};

export default TermOfServiceRoute;
