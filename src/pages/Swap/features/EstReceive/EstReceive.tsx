import Column from 'components/Core/Column';
import { RowBetween, RowFlat } from 'components/Core/Row';
import { PRV } from 'constants/token';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { useAppSelector } from 'state/hooks';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled(Column)`
  background-color: ${({ theme }) => theme.bg4};
  padding: 15px 16px;
  border-radius: 8px;
  .header-right {
    align-items: center;
  }
  a {
    color: ${({ theme }) => theme.primary8};
    :hover {
      opacity: 0.9;
    }
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
  time: string;
}

const EstReceive = React.memo(({ amountText, symbol, networkFee, burnFeeText, time }: IProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const prvToken = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);

  return (
    <Styled>
      <RowBetween style={{ cursor: 'pointer' }} onClick={() => setOpen((isOpen) => !isOpen)}>
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
          <RowBetween style={{ marginTop: 12 }}>
            <ThemedText.Small fontWeight={400}>Estimate time</ThemedText.Small>
            <ThemedText.Small fontWeight={400}>{`${time} mins`}</ThemedText.Small>
          </RowBetween>
          {!!prvToken.amount && (
            <ThemedText.Small color="primary8" fontWeight={400} marginTop="12px">
              {`Incognito collects a small network fee of ${networkFee} to pay the miners who help power the network. Get
            some from the `}
              <a href="https://faucet.incognito.org/" target="_blank" rel="noreferrer">
                faucet
              </a>
              .
            </ThemedText.Small>
          )}
        </Column>
      )}
    </Styled>
  );
});

EstReceive.displayName = 'EstReceive';

export default EstReceive;
