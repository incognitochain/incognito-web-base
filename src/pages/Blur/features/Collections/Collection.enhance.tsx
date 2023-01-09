import React from 'react';
import { compose } from 'redux';

const enhance = (WrappedComponent: any) => {
  const BlurComp = (props: any) => {
    // handle fetch data HERE!!
    return <WrappedComponent {...{ ...props }} />;
  };
  BlurComp.displayName = 'BlurComp.enhance';
  return BlurComp;
};

export default compose(enhance);
