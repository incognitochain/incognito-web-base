import useActiveBalance from 'lib/hooks/useActiveBalance';
import useApproveToken from 'lib/hooks/useApproveToken';
import React from 'react';
import { useAppSelector } from 'state/hooks';

import { depositDataSelector } from './FormDeposit.selectors';

export interface IDeposit {
  isIncognitoAddress: boolean;
  disabledForm: boolean;
  button: {
    text: string;
    disabled: boolean;
  };
}
export const useDeposit = (): IDeposit => {
  const { sellToken, isIncognitoAddress, disabledForm } = useAppSelector(depositDataSelector);
  const { isApproved, approvedAllowance, checkIsApproved, handleApproveToken, isApproving, isCheckingApprove } =
    useApproveToken({ token: sellToken });
  const { balance, decimals, isLoading, loadBalance: onLoadBalance } = useActiveBalance({ token: sellToken });

  const button = React.useMemo(() => {
    let text = 'Deposit';
    let disabled = false;
    if (isApproving) {
      text = 'Approving';
      disabled = true;
    } else if (isCheckingApprove || isLoading) {
      text = 'Loading...';
      disabled = true;
    } else if (!isApproved) {
      text = 'Approve';
      disabled = true;
    }
    return {
      text,
      disabled,
    };
  }, [isApproving, isApproving, isCheckingApprove, isLoading]);

  return {
    button,
    isIncognitoAddress,
    disabledForm,
  };
};
