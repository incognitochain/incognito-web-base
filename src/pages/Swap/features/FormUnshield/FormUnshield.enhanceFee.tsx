import debounce from 'lodash/debounce';
import React from 'react';
import { useAppDispatch } from 'state/hooks';

import { actionEstimateFee, actionEstimateSwapFee } from './FormUnshield.actions';
import { FormTypes } from './FormUnshield.types';

export interface TInner {
  onEstimateFee: () => void;
}

const enhanceFee = (WrappedComponent: any) => {
  const FormUnshieldComp = (props: any) => {
    const dispatch = useAppDispatch();
    const {
      isExternalAddress,
      unshieldAddress,
      incAddress,
      inputAmount,
      sellToken,
      buyToken,
      formType,
      buyNetworkName,
    } = props;

    const onEstimateFee = () => {
      dispatch(actionEstimateFee());
    };

    const onEstimateSwapFee = () => {
      dispatch(actionEstimateSwapFee());
    };

    const debounceEstimateFee = React.useMemo(() => debounce(onEstimateFee, 500), []);

    const debounceEstimateSwapFee = React.useMemo(() => debounce(onEstimateSwapFee, 500), []);

    React.useEffect(() => {
      // Case estimate fee for unshielded transactions
      if (formType === FormTypes.UNSHIELD && unshieldAddress && isExternalAddress && incAddress) {
        debounceEstimateFee();
      }

      // Case estimate fee for swapped transactions
      if (formType === FormTypes.SWAP && unshieldAddress) {
        debounceEstimateSwapFee();
      }
    }, [
      unshieldAddress,
      isExternalAddress,
      incAddress,
      inputAmount,
      sellToken.tokenID,
      buyToken.tokenID,
      buyNetworkName,
    ]);

    return <WrappedComponent {...{ ...props }} />;
  };
  FormUnshieldComp.displayName = 'FormUnshield.enhanceFee';
  return FormUnshieldComp;
};

export default enhanceFee;
