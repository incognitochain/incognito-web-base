import { SELECTION_NETWORKS } from 'pages/Swap/features/FormUnshield/FormUnshield.constants';
import React, { useState } from 'react';
// import { isMobile } from 'react-device-detect';
import styled from 'styled-components/macro';

const SelectionHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  background: red;
  justify-content: center;
  align-items: center;
`;

const PeggingListApps = () => {
  const [selected, setSelected] = useState(SELECTION_NETWORKS[0].label);
  return (
    <div>
      <SelectionHorizontal>
        {SELECTION_NETWORKS.map((item: any) => (
          <p key={item.label} style={{ backgroundColor: 'blue' }}>
            {item.label}
          </p>
        ))}
      </SelectionHorizontal>
    </div>
  );
};

export default React.memo(PeggingListApps);
