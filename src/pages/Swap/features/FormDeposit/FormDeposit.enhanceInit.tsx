import React from 'react';

import { useDeposit } from './FormDeposit.hook';

const enhanceInit = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const data = useDeposit();
    return <WrappedComponent {...{ ...props, ...data }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceInit';
  return FormDepositComp;
};

export default enhanceInit;
