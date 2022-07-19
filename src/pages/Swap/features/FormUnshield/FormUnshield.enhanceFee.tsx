import debounce from 'lodash/debounce';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee } from './FormUnshield.actions';

export interface TInner {
  onEstimateFee: () => void;
}

const enhanceFee = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const dispatch = useAppDispatch();
    const { isExternalAddress, unshieldAddress, incAddress, inputAmount, buyToken } = props;

    const onEstimateFee = () => {
      dispatch(actionEstimateFee());
    };

    const debounceEstimateFee = React.useMemo(() => debounce(onEstimateFee, 500), []);

    React.useEffect(() => {
      if (unshieldAddress && isExternalAddress && incAddress) {
        debounceEstimateFee();
      }
    }, [unshieldAddress, isExternalAddress, incAddress, inputAmount, buyToken.tokenID]);

    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceFee';
  return FormUnshieldComp;
};

export default enhanceFee;
