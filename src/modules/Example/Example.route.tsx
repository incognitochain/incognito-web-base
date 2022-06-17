import Example from '@modules/Example';
import { IRouteProps } from '@src/modules';
import React from 'react';

export const route = '/example';

const exampleRoute: IRouteProps = {
  path: route,
  exact: true,
  element: <Example />,
};

export default exampleRoute;
