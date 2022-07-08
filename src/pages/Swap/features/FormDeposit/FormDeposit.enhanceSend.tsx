import React from 'react';

const enhanceDeposit = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceDeposit';
  return FormDepositComp;
};

export default enhanceDeposit;
