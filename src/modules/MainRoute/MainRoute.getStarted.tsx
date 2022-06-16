import React, { FunctionComponent } from 'react';

const withStarted = (WrappedComponent: FunctionComponent) => (props: any) => {
  return <WrappedComponent {...props} />;
};

export default withStarted;
