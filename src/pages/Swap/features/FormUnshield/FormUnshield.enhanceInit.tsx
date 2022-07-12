import React from 'react';

import { useUnshield } from './FormUnshield.hook';

const enhanceInit = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const data = useUnshield();
    return <WrappedComponent {...{ ...props, ...data }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceInit';
  return FormUnshieldComp;
};

export default enhanceInit;
