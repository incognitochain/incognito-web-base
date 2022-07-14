import Column from 'components/Core/Column';
import { RowBetween } from 'components/Core/Row';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled(Column)`
  background-color: ${({ theme }) => theme.bg4};
  padding: 15px 16px;
  border-radius: 8px;
`;

const EstReceive = React.memo(() => {
  return (
    <Styled>
      <RowBetween>
        <ThemedText.SmallLabel fontWeight={400}>You will receive</ThemedText.SmallLabel>
        <ThemedText.RegularLabel>100 ETH</ThemedText.RegularLabel>
      </RowBetween>
    </Styled>
  );
});

EstReceive.displayName = 'EstReceive';

export default EstReceive;
