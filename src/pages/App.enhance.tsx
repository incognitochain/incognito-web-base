import ErrorBoundary from 'components/Core/ErrorBoundary';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionGetPTokens } from 'state/token';

const enhance = (WrappedComponent: React.FunctionComponent) => {
  const AppComp = (props: any) => {
    const dispatch = useDispatch();

    const getPTokenList = () => {
      dispatch(actionGetPTokens());
    };

    React.useEffect(() => {
      getPTokenList();
    }, []);

    return (
      <ErrorBoundary>
        <WrappedComponent {...{ ...props }} />
      </ErrorBoundary>
    );
  };
  AppComp.displayName = 'App.enhance';
  return AppComp;
};

export default enhance;
