import useActiveWeb3React from 'hooks/useActiveWeb3React';

const profileUseContract = () => {
  const { account, chainId: currentChainID } = useActiveWeb3React();

  return null;
};

export default profileUseContract;
