import React from 'react';

const enhanceAmountValidator = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceAmountValidator';
  return FormDepositComp;
};

export default enhanceAmountValidator;
