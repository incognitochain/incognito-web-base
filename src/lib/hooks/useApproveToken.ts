import { BigNumber } from 'bignumber.js';
import { getINCContractAddress, getWeb3 } from 'constants/infura';
// eslint-disable-next-line no-restricted-imports
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTokenContract } from 'hooks/useContract';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';
const initValue = { isCheckingApprove: false, approvedAllowance: '0', isApproving: false };

export interface IApprove {
  isCheckingApprove: boolean;
  isApproved: boolean;
  isApproving: boolean;
  approvedAllowance: string;
  checkIsApproved: () => Promise<any>;
  handleApproveToken: () => Promise<any>;
  handleGetNonce: () => any;
}

const useApproveToken = ({ token, amount }: { token: SelectedPrivacy; amount: number }): IApprove => {
  const [state, setState] = React.useState<{
    isCheckingApprove: boolean;
    isApproving: boolean;
    approvedAllowance: string;
  }>(initValue);

  const { account, chainId: web3ChainID } = useActiveWeb3React();
  const chainId = token.chainID;
  const contract = useTokenContract(token.contractID ? token.contractID : null, true);

  const checkIsApproved = async () => {
    let allowanceText = '0';
    try {
      if (!account || !chainId || web3ChainID !== chainId) return;
      setState((value) => ({ ...value, isCheckingApprove: true }));
      const INC_CONTRACT = getINCContractAddress({ chainId });
      const allowance = await contract?.allowance(account, INC_CONTRACT);
      allowanceText = allowance ? allowance.toString() : '0';
      setState((value) => ({
        ...value,
        approvedAllowance: allowanceText,
        isCheckingApprove: false,
      }));
    } catch (e) {
      setState(initValue);
    }
    return allowanceText;
  };

  const handleGetNonce = async (): Promise<number> => {
    let nonce = 0;
    try {
      if (!account || !chainId) return nonce;
      const web3 = getWeb3({ chainId });
      nonce = await web3.eth.getTransactionCount(account);
    } catch (error) {
      console.log('GET NONCE FAIL: ', error);
    }
    return nonce;
  };

  const handleApproveToken = async () => {
    let tx;
    try {
      if (!account || !chainId || token.isMainEVMToken || web3ChainID !== chainId) return;
      setState((value) => ({ ...value, isApproving: true }));
      const approveMax = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
      const INC_CONTRACT = getINCContractAddress({ chainId });
      tx = await contract?.approve(INC_CONTRACT, approveMax).then();
      await tx?.wait();
    } catch (error) {
      setState((value) => ({ ...value, isApproving: false }));
      console.log('HANDLE APPROVE FAIL: ', error);
      throw error;
    } finally {
      setState((value) => ({ ...value, isApproving: false }));
    }
    return tx;
  };

  React.useEffect((): any => {
    if (!account || !chainId || token.isMainEVMToken) return;
    checkIsApproved().then();
  }, [account, chainId, token.identify, web3ChainID]);

  const isApproved = React.useMemo(() => {
    if (token.isMainEVMToken) return true;
    return new BigNumber(state.approvedAllowance).gt(amount || 0);
  }, [token.identify, state.approvedAllowance, amount]);

  return {
    isCheckingApprove: state.isCheckingApprove,
    isApproving: state.isApproving,
    approvedAllowance: state.approvedAllowance,
    isApproved,

    checkIsApproved,
    handleApproveToken,
    handleGetNonce,
  };
};

export default useApproveToken;
