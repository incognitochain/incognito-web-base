import React from 'react';

import { FOOTER_ID, HEADER_ID } from '../pages/App';
import { useWindowSize } from './useWindowSize';

const useContentSize = () => {
  const { height } = useWindowSize();

  const [contentSize, setContentSize] = React.useState(height || 0);

  const getContentSize = () => {
    let contentSize = 0;
    const header = document.getElementById(HEADER_ID);
    const footer = document.getElementById(FOOTER_ID);
    if (height && header && footer) {
      const headerHeight = header.clientHeight;
      const footerHeight = footer.clientHeight;
      contentSize = height - headerHeight - footerHeight - 35;
    }
    setContentSize(contentSize);
  };

  React.useEffect(() => {
    getContentSize();
  }, []);

  return [contentSize];
};

export default useContentSize;
