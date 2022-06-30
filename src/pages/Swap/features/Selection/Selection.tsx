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
  display: flex;
  .section {
    padding: 16px;
    flex: 1;
  }
  .selection-item {
    width: 100%;
    min-height: 52px;
  }
  .line {
    background-color: red;
    width: 1px;
    height: 85px;
    transform: translateX(50%);
    top: 0;
  }
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
      <MainStyled>
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Token
          </ThemedText.SmallLabel>
          <div className="selection-item" />
        </div>
        <div className="line" />
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Network
          </ThemedText.SmallLabel>
          <div className="selection-item" />
        </div>
      </MainStyled>
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
