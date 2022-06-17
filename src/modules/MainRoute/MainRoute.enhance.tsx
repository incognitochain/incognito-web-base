import { IRouteProps } from '@src/modules';
import { camelCase } from 'lodash';
import React, { FunctionComponent } from 'react';

// @ts-ignore
const context = import.meta.globEager('../../../src/**/*route.tsx');

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);

  const handleGetRoutes = async () => {
    const allRoutes: IRouteProps[] = [];
    for (const key in context) {
      allRoutes.push(context[key].default);
    }
    setRoutes([...allRoutes]);
  };

  React.useEffect(() => {
    handleGetRoutes().then();
  }, []);

  if (!routes || routes.length === 0) return null;

  console.log(routes);

  return <WrappedComponent {...props} routes={routes} />;
};

export default enhance;
