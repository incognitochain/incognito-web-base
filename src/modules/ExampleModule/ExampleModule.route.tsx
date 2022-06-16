import ExampleModule from '@modules/ExampleModule/ExampleModule';
import { IRouteProps } from '@src/modules';
import React from 'react';
export const route = '/example-module';

const exampleModuleRoute: IRouteProps = {
  path: route,
  exact: true,
  element: <ExampleModule />,
};

export default exampleModuleRoute;
