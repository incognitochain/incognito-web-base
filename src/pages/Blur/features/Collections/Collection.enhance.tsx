import { actionFetchCollections } from 'pages/Blur';
import React from 'react';
import { compose } from 'redux';
import { useAppDispatch } from 'state/hooks';

const enhance = (WrappedComponent: any) => {
  const BlurComp = (props: any) => {
    const dispatch = useAppDispatch();

    const onFetchCollections = () => {
      dispatch(actionFetchCollections());
    };

    React.useEffect(() => {
      onFetchCollections();
    }, []);

    return <WrappedComponent {...{ ...props }} />;
  };
  BlurComp.displayName = 'BlurComp.enhance';
  return BlurComp;
};

export default compose(enhance);
