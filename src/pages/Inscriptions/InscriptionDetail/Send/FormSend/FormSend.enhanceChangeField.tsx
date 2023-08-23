import { change, focus } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { FORM_CONFIGS } from './FormSend.constant';

export interface TInner {
  onChangeField: (value: string, field: string) => any;
}

const enhanceChangeField = (WrappedComponent: any) => {
  const FormSendComp = (props: any) => {
    const dispatch = useAppDispatch();

    const onChangeField = async (value: string, field: string) => {
      const val: any = value;
      dispatch(change(FORM_CONFIGS.formName, field, val));
      dispatch(focus(FORM_CONFIGS.formName, field));
    };

    return <WrappedComponent {...{ ...props, onChangeField }} />;
  };
  FormSendComp.displayName = 'FormSendComp.enhanceChangeField';
  return FormSendComp;
};

export default enhanceChangeField;
