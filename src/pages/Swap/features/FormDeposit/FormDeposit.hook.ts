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
import { AccountInfo, incognitoWalletAccountSelector } from 'state/incognitoWallet';
import convert from 'utils/convert';

import format from '../../../../utils/format';
import { depositDataSelector } from './FormDeposit.selectors';

export interface IDeposit {
  isIncognitoAddress: boolean;
  disabledForm: boolean;
  sellTokenList: PToken[];
  sellNetworkList: ITokenNetwork[];
  sellNetworkName: string;
  sellToken: SelectedPrivacy;
  sellTokenParent: SelectedPrivacy;

  buyToken: SelectedPrivacy;
  buyNetworkName: string;
  button: {
    text: string;
    disabled: boolean;
    switchNetwork: boolean;
  };

  amount: {
    maxAmountText: string;
    maxAmount: string;
    inputOriginalAmount: number;
    maxAmountFormatedText: string;
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
    sellTokenParent,

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
  const { balance, decimals, isLoading, loadBalance: onLoadBalance, gas } = useActiveBalance({ token: sellToken });
  const _incAccount = useSelector(incognitoWalletAccountSelector);

  const handleSubmitHash = async ({ hash }: { hash: string }) => {
    try {
      // await submitDepositTx({
      //   hash,
      //   tokenID: sellTokenParent.tokenID,
      //   networkID: sellToken.networkID,
      // });
    } catch (error) {
      console.log('SUBMIT TRANSACTION ERROR: ', error);
    }
  };

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
      if (!!tx.hash) {
        await handleSubmitHash({ hash: tx.hash });
      }
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
      if (!!tx.hash) {
        await handleSubmitHash({ hash: tx.hash });
      }
      await tx.wait();
      return tx;
    } catch (error) {
      throw error;
    }
  };

  const amount = React.useMemo(() => {
    const maxAmountEtherText = convert
      .toHumanAmount({
        decimals,
        originalAmount: new BigNumber(balance || 0).toNumber(),
      })
      .toString();
    const maxAmountOriginal = convert.toOriginalAmount({
      humanAmount: maxAmountEtherText,
      decimals: sellToken.pDecimals,
      round: false,
    });

    const maxAmount = convert.toHumanAmountString({
      decimals: sellToken.pDecimals,
      originalAmount: new BigNumber(
        Math.floor(new BigNumber(maxAmountOriginal || 0).minus(sellToken.isMainEVMToken ? gas || 0 : 0).toNumber())
      ).toNumber(),
    });

    const maxAmountFormatedText = format.amountVer2({
      decimals: sellToken.pDecimals,
      originalAmount: new BigNumber(Math.floor(maxAmountOriginal || 0)).toNumber(),
    });

    return {
      maxAmountText: maxAmount.toString(),
      maxAmount: balance,
      inputOriginalAmount,
      maxAmountFormatedText: `${maxAmountFormatedText} ${sellToken.symbol}`,
    };
  }, [balance, decimals, inputOriginalAmount, sellToken.amount, sellToken.identify, gas]);

  const button = React.useMemo(() => {
    let text = 'Deposit';
    let disabled = false;
    let switchNetwork = false;
    if (!account) {
      text = 'Connect Wallet';
      disabled = true;
    } else if (chainId !== sellToken.chainID) {
      text = 'Switch network';
      disabled = true;
      switchNetwork = true;
    } else if (disabledForm) {
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
      switchNetwork,
    };
  }, [isApproving, isApproving, isCheckingApprove, isLoading, disabledForm, sellToken.chainID, chainId, account]);

  const incAccount = React.useMemo(() => {
    if (!_incAccount) return undefined;
    return _incAccount;
  }, [_incAccount]);

  return {
    button,
    isIncognitoAddress,
    disabledForm,
    sellTokenList,
    sellNetworkList,
    sellNetworkName,
    sellToken,
    sellTokenParent,

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
