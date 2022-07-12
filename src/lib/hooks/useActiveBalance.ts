import { getWeb3 } from 'constants/infura';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTokenContract } from 'hooks/useContract';
import debounce from 'lodash/debounce';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';

const initValue = { balance: '0', decimals: 18, isLoading: false };

export interface IActiveBalance {
  balance: string;
  decimals: number;
  isLoading: boolean;
  loadBalance: () => void;
}

const useActiveBalance = ({ token }: { token: SelectedPrivacy }): IActiveBalance => {
  const [state, setState] = React.useState<{
    balance: string;
    decimals: number;
    isLoading: boolean;
  }>(initValue);
  const { account, chainId: web3ChainID } = useActiveWeb3React();
  const chainId = token.chainID;
  const contract = useTokenContract(token.contractID ? token.contractID : null, false);

  const onLoadBalance = async () => {
    try {
      setState(initValue);
      if (!account || !chainId || !token || web3ChainID !== chainId) return;
      setState((value) => ({ ...value, isLoading: true }));
      const isNativeToken = token.isMainEVMToken;
      let decimals = token.decimals || 18;
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

  const debounceLoadBalance = debounce(onLoadBalance, 300);

  React.useEffect((): any => {
    if (!account || !chainId) return;
    debounceLoadBalance();
  }, [account, chainId, token.tokenID, web3ChainID]);

  return {
    balance: state.balance,
    decimals: state.decimals,
    isLoading: state.isLoading,
    loadBalance: debounceLoadBalance,
  };
};

export default useActiveBalance;
