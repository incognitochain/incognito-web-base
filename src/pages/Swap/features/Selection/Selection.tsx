import Row, { RowBetween } from 'components/Core/Row';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

interface ISelection {
  title: string;
  rightLabel?: string;
}

const MainStyled = styled(Row)`
  border: 1px solid #363636;
  border-radius: 8px;
  min-height: 88px;
  background-color: ${({ theme }) => theme.primary14};
  margin-top: 4px;
`;

const Selection = React.memo((props: ISelection) => {
  const { title, rightLabel } = props;
  return (
    <>
      <RowBetween>
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {title}
        </ThemedText.SmallLabel>
        {!!rightLabel && (
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            {rightLabel}
          </ThemedText.SmallLabel>
        )}
      </RowBetween>
      <MainStyled />
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
