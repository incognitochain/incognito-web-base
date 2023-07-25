import React from 'react';

import DescriptionContent from './components/DescriptionContent';
import InscriptionList from './components/InscriptionList';
import { Container } from './MyInscriptions.styles';

const InscriptionDetail = () => {
  return (
    <Container>
      <DescriptionContent />
      {/* <ToolBar /> */}
      <InscriptionList></InscriptionList>
    </Container>
  );
};

export default React.memo(InscriptionDetail);
