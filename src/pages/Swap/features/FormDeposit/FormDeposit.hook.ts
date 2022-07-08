import { BigNumber } from 'bignumber.js';
import useActiveBalance from 'lib/hooks/useActiveBalance';
import useApproveToken from 'lib/hooks/useApproveToken';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
import { useAppSelector } from 'state/hooks';
import convert from 'utils/convert';

import { depositDataSelector } from './FormDeposit.selectors';

export interface IDeposit {
  isIncognitoAddress: boolean;
  disabledForm: boolean;
  sellTokenList: PToken[];
  sellNetworkList: ITokenNetwork[];
  sellNetworkName: string;
  sellToken: SelectedPrivacy;

  buyToken: SelectedPrivacy;
  buyNetworkName: string;
  button: {
    text: string;
    disabled: boolean;
  };

  amount: {
    maximumAmountText: string;
    maximumAmount: string;
  };
}
export const useDeposit = (): IDeposit => {
  const {
    sellToken,
    isIncognitoAddress,
    disabledForm,
    sellTokenList,
    sellNetworkList,
    sellNetworkName,

    buyToken,
    buyNetworkName,

    inputOriginalAmount,
  } = useAppSelector(depositDataSelector);
  const { isApproved, approvedAllowance, checkIsApproved, handleApproveToken, isApproving, isCheckingApprove } =
    useApproveToken({ token: sellToken });
  const { balance, decimals, isLoading, loadBalance: onLoadBalance } = useActiveBalance({ token: sellToken });

  const button = React.useMemo(() => {
    let text = 'Deposit';
    let disabled = false;
    if (disabledForm) {
      text = 'Deposit';
      disabled = true;
    } else if (isApproving) {
      text = 'Approving';
      disabled = true;
    } else if (isCheckingApprove || isLoading) {
      text = 'Loading...';
      disabled = true;
    } else if (!isApproved) {
      text = 'Approve';
      disabled = false;
    }
    return {
      text,
      disabled,
    };
  }, [isApproving, isApproving, isCheckingApprove, isLoading, disabledForm]);

  const amount = React.useMemo(() => {
    const maximumAmountText = convert
      .toHumanAmount({
        decimals,
        originalAmount: new BigNumber(balance || 0).toNumber(),
      })
      .toString();
    return {
      maximumAmountText,
      maximumAmount: balance,
    };
  }, [balance, decimals, inputOriginalAmount]);

  return {
    button,
    isIncognitoAddress,
    disabledForm,
    sellTokenList,
    sellNetworkList,
    sellNetworkName,
    sellToken,

    buyToken,
    buyNetworkName,

    amount,
  };
};
