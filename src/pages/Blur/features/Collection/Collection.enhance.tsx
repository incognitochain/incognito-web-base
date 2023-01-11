import { actionFetchCollections, collectionsSelector } from 'pages/Blur';
import React from 'react';
import { compose } from 'redux';
import { useAppDispatch, useAppSelector } from 'state/hooks';

const enhance = (WrappedComponent: any) => {
  const BlurComp = (props: any) => {
    const dispatch = useAppDispatch();
    const { list: collections } = useAppSelector(collectionsSelector);

    const onFetchCollections = ({ page }: { page: number }) => {
      dispatch(actionFetchCollections({ page }));
    };

    React.useEffect(() => {
      if (collections && collections.length > 0) return;
      onFetchCollections({ page: 1 });
    }, []);

    return <WrappedComponent {...{ ...props, onFetchCollections }} />;
  };
  BlurComp.displayName = 'BlurComp.enhance';
  return BlurComp;
};

export default compose(enhance);
