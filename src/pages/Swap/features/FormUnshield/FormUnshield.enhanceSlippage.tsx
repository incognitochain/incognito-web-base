import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';

const enhanceSlippage = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const { onChangeField } = props;
    React.useEffect(() => {
      onChangeField('0.5', FORM_CONFIGS.slippage);
    }, []);
    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceSlippage';
  return FormUnshieldComp;
};

export default enhanceSlippage;
