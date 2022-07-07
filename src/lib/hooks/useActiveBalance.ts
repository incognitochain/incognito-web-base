import { getWeb3 } from 'constants/infura';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTokenContract } from 'hooks/useContract';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';

const initValue = { balance: '0', decimals: 18, isLoading: false };

export interface IActiveBalance {
  balance: string;
  decimals: number;
  isLoading: boolean;
}

const useActiveBalance = ({ token }: { token: SelectedPrivacy }) => {
  const [state, setState] = React.useState<{
    balance: string;
    decimals: number;
    isLoading: boolean;
  }>(initValue);
  const { account, chainId } = useActiveWeb3React();
  const contract = useTokenContract(token.contractID ? token.contractID : null, false);

  const onLoadBalance = async () => {
    try {
      setState(initValue);
      if (!account || !chainId || !token) return;
      setState((value) => ({ ...value, isLoading: true }));
      const isNativeToken = token.isMainEVMToken;
      let decimals = 18;
      let balance = '0';
      if (isNativeToken) {
        const web3 = getWeb3({ chainId });
        balance = await web3.eth.getBalance(account);
      } else {
        decimals = (await contract?.decimals()) || 18;
        const tokenBalance = await contract?.balanceOf(account);
        if (tokenBalance) {
          balance = tokenBalance.toString();
        }
      }
      setState({ isLoading: false, balance, decimals });
    } catch (e) {
      console.log('LOAD BALANCE ERROR: ', e);
      setState(initValue);
    }
  };

  React.useEffect((): any => {
    if (!account || !chainId) return;
    onLoadBalance().then();
  }, [account, chainId, token.tokenID]);

  return {
    ...state,
  };
};

export default useActiveBalance;
