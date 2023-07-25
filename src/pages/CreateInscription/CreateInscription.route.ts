import { IRouteProps } from 'pages';
import { lazy } from 'react';

export const route = '/create-inscription';

const CreateInscriptionRoute: IRouteProps = {
  path: route,
  exact: true,
  component: lazy(() => import('./CreateInscription.home')),
  name: 'CreateInscription',
  to: route,
};

export default CreateInscriptionRoute;
