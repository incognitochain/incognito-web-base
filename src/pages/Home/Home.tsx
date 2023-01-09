import { useWindowSize } from 'hooks/useWindowSize';
import { FOOTER_ID, HEADER_ID } from 'pages/App';
import React, { memo } from 'react';

import rpcPBlur from '../../services/rpcPBlur';
import Analytics from './Home.analytics';
import Collections from './Home.colections';
import GroupButtons from './Home.groupBtn';
import { Container } from './Home.styled';
import BGImg from './images/background.png';

const Home = () => {
  const { width, height } = useWindowSize();

  const [contentSize, setContentSize] = React.useState(height || 0);

  const getContentSize = () => {
    let contentSize = 0;
    const header = document.getElementById(HEADER_ID);
    const footer = document.getElementById(FOOTER_ID);
    if (height && header && footer) {
      const headerHeight = header.clientHeight;
      // const footerHeight = footer.clientHeight;
      const footerHeight = 0;
      contentSize = height - headerHeight - footerHeight - 35;
    }
    setContentSize(contentSize);
  };

  React.useEffect(() => {
    getContentSize();

    rpcPBlur.getCollections().then();
  }, [width, height]);

  return (
    <Container height={contentSize} style={{ backgroundImage: `url(${BGImg})` }}>
      <div className="section-1">
        <h2 className="main-header-text">The privacy layer of crypto</h2>
        <p className="sub-header-text">
          Privacy is a fundamental human right. Even more so for crypto users. Which is why we build Incognito to
          protect it.
        </p>
        <GroupButtons />
      </div>
      <Analytics />
      <div className="section-2">
        <Collections />
      </div>
    </Container>
  );
};

export default memo(Home);
