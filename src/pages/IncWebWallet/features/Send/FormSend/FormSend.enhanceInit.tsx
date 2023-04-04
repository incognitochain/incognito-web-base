import useFollowTokenSelected from 'pages/IncWebWallet/hooks/useFollowTokenSelected';

const enhanceInit = (WrappedComponent: any) => {
  const FormDepositComp = (props: any) => {
    const followTokenSelectedData = useFollowTokenSelected();
    return <WrappedComponent {...{ ...props, ...followTokenSelectedData }} />;
  };
  FormDepositComp.displayName = 'FormDeposit.enhanceInit';
  return FormDepositComp;
};

export default enhanceInit;
