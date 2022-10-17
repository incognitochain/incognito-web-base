import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/earnings/validator';

const ValidatorsRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./Validators')),
  name: 'Validators',
  to: route,
};

export default ValidatorsRoute;
