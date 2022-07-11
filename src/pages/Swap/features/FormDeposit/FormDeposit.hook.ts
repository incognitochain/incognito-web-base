import { JsonRpcProvider } from '@ethersproject/providers';
import INC_ABI from 'abis/inc.json';
import { BigNumber } from 'bignumber.js';
import { getINCContractAddress, getWeb3 } from 'constants/infura';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useActiveBalance from 'lib/hooks/useActiveBalance';
import useApproveToken from 'lib/hooks/useApproveToken';
import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'state/hooks';
import convert from 'utils/convert';

import { AccountInfo, incognitoWalletAccountsSelector } from '../../../../state/incognitoWallet';
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
    inputOriginalAmount: number;
  };

  isApproved: boolean;
  checkIsApproved: () => Promise<any>;
  handleApproveToken: () => Promise<any>;

  handleDepositERC20: () => any;
  handleDepositEVM: () => any;
  handleLoadBalance: () => any;

  incAccount: AccountInfo | undefined;
}
export const useDeposit = (): IDeposit => {
  const { account, chainId, provider } = useActiveWeb3React();
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
    inputAmount,

    inputAddress,
  } = useAppSelector(depositDataSelector);
  const { isApproved, checkIsApproved, handleApproveToken, isApproving, isCheckingApprove } = useApproveToken({
    token: sellToken,
    amount: inputOriginalAmount,
  });
  const { balance, decimals, isLoading, loadBalance: onLoadBalance } = useActiveBalance({ token: sellToken });
  const incAccounts = useSelector(incognitoWalletAccountsSelector);

  const handleDepositEVM = async () => {
    try {
      if (!chainId || !account) return;
      // Deposit ETH
      const web3 = getWeb3({ chainId });
      const INC_CONTRACT_ABI = INC_ABI as any;
      const INC_CONTRACT_ADDRESS: any = getINCContractAddress({ chainId });
      const incInstance = new web3.eth.Contract(INC_CONTRACT_ABI);
      const sendAmount = '0x' + new BigNumber(inputAmount).multipliedBy(1e18).toString(16);
      const depData = incInstance.methods.deposit(inputAddress).encodeABI();
      const library = provider as JsonRpcProvider;
      const tx: any = await library.getSigner().sendTransaction({
        from: account,
        to: INC_CONTRACT_ADDRESS,
        value: sendAmount,
        data: depData,
      });
      await tx.wait();
      return tx;
    } catch (error) {
      throw error;
    }
  };

  const handleDepositERC20 = async () => {
    try {
      if (!chainId || !account) return;
      // Deposit ERC20
      const web3 = getWeb3({ chainId });
      const INC_CONTRACT_ABI = INC_ABI as any;
      const INC_CONTRACT_ADDRESS: any = getINCContractAddress({ chainId });
      const sendAmount = '0x' + new BigNumber(inputAmount).multipliedBy(10 ** decimals).toString(16);
      const incInstance = new web3.eth.Contract(INC_CONTRACT_ABI, INC_CONTRACT_ADDRESS);
      const depData = incInstance.methods.depositERC20(sellToken.contractID, sendAmount, inputAddress).encodeABI();
      const library = provider as JsonRpcProvider;
      const tx: any = await library.getSigner().sendTransaction({
        from: account,
        to: INC_CONTRACT_ADDRESS,
        data: depData,
        gasLimit: 100000,
      });
      await tx.wait();
      return tx;
    } catch (error) {
      throw error;
    }
  };

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
      inputOriginalAmount,
    };
  }, [balance, decimals, inputOriginalAmount]);

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

  const incAccount = React.useMemo(() => {
    if (!incAccounts || incAccounts.length === 0) return undefined;
    return incAccounts[0];
  }, [incAccounts]);

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

    isApproved,
    checkIsApproved,
    handleApproveToken,
    handleDepositERC20,
    handleDepositEVM,
    handleLoadBalance: onLoadBalance,

    incAccount,
  };
};
