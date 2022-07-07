import Row, { RowBetween } from 'components/Core/Row';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import PToken from 'models/model/pTokenModel';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

interface ISelection {
  title: string;
  rightLabel?: string;
  rightValue?: string;
  leftValue?: string;
  tokens?: PToken[];
  onSelectToken?: ({ token }: { token: PToken }) => void;
}

const MainStyled = styled(Row)`
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 8px;
  min-height: 88px;
  background-color: ${({ theme }) => theme.primary14};
  margin-top: 4px;
  position: relative;
  .section {
    padding: 16px;
    flex: 1;
  }
  .selection-item {
    width: 100%;
    height: 52px;
  }
  .line {
    background-color: ${({ theme }) => theme.border1};
    width: 1px;
    top: 0;
    position: absolute;
    bottom: 0;
    left: 49%;
  }
`;

const Selection = React.memo((props: ISelection) => {
  const { title, rightLabel, rightValue, leftValue, tokens, onSelectToken } = props;
  const { setModal } = useModal();

  const showTokensList = () => {
    if (!tokens || tokens.length === 0) return;
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={onSelectToken} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
    });
  };

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
          <div className="selection-item" onClick={showTokensList}>
            {!!leftValue && (
              <ThemedText.SmallLabel fontWeight={400} color="primary8">
                {leftValue}
              </ThemedText.SmallLabel>
            )}
          </div>
        </div>
        <div className="line" />
        <div className="section">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            Network
          </ThemedText.SmallLabel>
          <div className="selection-item">
            {!!rightValue && (
              <ThemedText.SmallLabel fontWeight={400} color="primary8">
                {rightValue}
              </ThemedText.SmallLabel>
            )}
          </div>
        </div>
      </MainStyled>
    </>
  );
});

Selection.displayName = 'Selection';

export default Selection;
