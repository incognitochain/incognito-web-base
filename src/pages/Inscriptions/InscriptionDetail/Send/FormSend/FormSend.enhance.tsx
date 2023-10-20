import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FORM_CONFIGS } from './FormSend.constant';
import enhanceAddressValidation from './FormSend.enhanceAddressValidator';
import enhanceChangeField from './FormSend.enhanceChangeField';
import enhanceSend from './FormSend.enhanceSend';
import { SendFormProps, WrappedComponentType } from './FormSend.types';

const enhance = (WrappedComponent: WrappedComponentType) => {
  const FormSendComp = (props: SendFormProps) => {
    //TO DO
    return <WrappedComponent {...{ ...props }} />;
  };
  FormSendComp.displayName = 'FormSendComp.enhance';
  return FormSendComp;
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: true,
  }),
  enhanceChangeField,
  enhanceAddressValidation,
  enhanceSend,
  enhance
) as any;
