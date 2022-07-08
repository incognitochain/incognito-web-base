import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import enhanceAddressValidation, { TInner as TInnerAddress } from './FormDeposit.enhanceAddressValidator';
import enhanceAmountValidator, { TInner as TInnerAmount } from './FormDeposit.enhanceAmountValidator';
import enhanceInit from './FormDeposit.enhanceInit';
import enhanceSelect, { TInter as TInnerSelect } from './FormDeposit.enhanceSelect';
import enhanceDeposit from './FormDeposit.enhanceSend';
import { IDeposit } from './FormDeposit.hook';

export interface IMergeProps extends InjectedFormProps<any, any>, IDeposit, TInnerAddress, TInnerAmount, TInnerSelect {
  onSend: () => void;
}

const enhance = (WrappedComponent: any) => {
  const FormDepositComp = (props: IMergeProps & any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhance';
  return FormDepositComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  enhanceInit,
  enhanceAddressValidation,
  enhanceAmountValidator,
  enhanceSelect,
  enhanceDeposit,
  enhance
) as any;
