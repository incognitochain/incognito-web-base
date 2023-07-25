import React from 'react';

import DescriptionContent from './components/DescriptionContent';
import InscriptionList from './components/InscriptionList';
import ScrollToTop from './components/ScrollToTop';
import ToolBar from './components/ToolBar';
import { Container } from './Inscriptions.styles';

const InscriptionDetail = () => {
  React.useEffect(() => {}, []);
  return (
    <Container>
      <DescriptionContent />
      <ToolBar />
      <InscriptionList></InscriptionList>
      <ScrollToTop />
    </Container>
  );
};

export default React.memo(InscriptionDetail);
