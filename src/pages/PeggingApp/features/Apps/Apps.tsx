import { SELECTION_NETWORKS } from 'pages/Swap/features/FormUnshield/FormUnshield.constants';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components/macro';

import AppSelections from './App.selections';
import AppsList from './Apps.list';

const Container = styled.div`
  flex: 1;
`;

const PeggingListApps = () => {
  const [selected, setSelected] = useState(SELECTION_NETWORKS[0].label);
  return (
    <Container>
      {!isMobile && <AppSelections selected={selected} onSelect={setSelected} />}
      <AppsList selected={selected} />
    </Container>
  );
};

export default React.memo(PeggingListApps);
