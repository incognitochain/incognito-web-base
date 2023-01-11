import React from 'react';

const enhance = (WrappedComponent: any) => {
  const CollectionDetailFooter = (props: any) => {
    return <WrappedComponent {...{ ...props }} />;
  };
  CollectionDetailFooter.displayName = 'CollectionDetailFooter.enhance';
  return CollectionDetailFooter;
};

export default enhance;
