import useActiveWeb3React from 'hooks/useActiveWeb3React';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React from 'react';

const useActiveBalance = ({ token }: { token: SelectedPrivacy }) => {
  const { account, chainId } = useActiveWeb3React();
  const [balance, setBalance] = React.useState<any>('');
  const [symbol, setSymbol] = React.useState<any>('');
  React.useEffect((): any => {
    if (!!account) {
      console.log('SANG TEST');
    }
  }, [account, chainId]); //
};

export default useActiveBalance;
