import Home from '@modules/Home';
import { IRouteProps } from '@src/modules';
import React from 'react';

export const route = '/';

const homeRoute: IRouteProps = {
  path: route,
  exact: true,
  component: Home,
};

export default homeRoute;
