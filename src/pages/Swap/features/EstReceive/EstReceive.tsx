import Column from 'components/Core/Column';
import { RowBetween, RowFlat } from 'components/Core/Row';
import React from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled(Column)`
  background-color: ${({ theme }) => theme.bg4};
  padding: 15px 16px;
  border-radius: 8px;
  cursor: pointer;
  .header-right {
    align-items: center;
  }
`;

const RotatingArrow = styled(ChevronDown)<{ open?: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
  transition: transform 0.1s linear;
  margin-left: 9px;
`;

interface IProps {
  amountText: string;
  symbol: string;
  networkFee: string;
  burnFeeText: string;
}

const EstReceive = React.memo(({ amountText, symbol, networkFee, burnFeeText }: IProps) => {
  const [isOpen, setOpen] = React.useState(true);
  return (
    <Styled>
      <RowBetween onClick={() => setOpen((isOpen) => !isOpen)}>
        <ThemedText.SmallLabel fontWeight={400}>You will receive</ThemedText.SmallLabel>
        <RowFlat className="header-right">
          <ThemedText.RegularLabel>{`${amountText || 0} ${symbol}`}</ThemedText.RegularLabel>
          <RotatingArrow open={isOpen} />
        </RowFlat>
      </RowBetween>
      {isOpen && (
        <Column style={{ marginTop: 14 }}>
          <RowBetween>
            <ThemedText.Small fontWeight={400}>Network fee</ThemedText.Small>
            <ThemedText.Small fontWeight={400}>{networkFee}</ThemedText.Small>
          </RowBetween>
          {!!burnFeeText && (
            <RowBetween style={{ marginTop: 12 }}>
              <ThemedText.Small fontWeight={400}>Outchain Fee (Est.)</ThemedText.Small>
              <ThemedText.Small fontWeight={400}>{burnFeeText}</ThemedText.Small>
            </RowBetween>
          )}
        </Column>
      )}
    </Styled>
  );
});

EstReceive.displayName = 'EstReceive';

export default EstReceive;
