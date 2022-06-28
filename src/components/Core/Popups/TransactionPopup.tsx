import { TransactionSummary } from 'components/Core/AccountDetails/TransactionSummary';
import { AutoColumn } from 'components/Core/Column';
import { AutoRow } from 'components/Core/Row';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useTransaction } from 'state/transactions/hooks';
import styled, { ThemeContext } from 'styled-components/macro';
import { ExternalLink, ThemedText } from 'theme';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

export default function TransactionPopup({ hash }: { hash: string }) {
  const { chainId } = useActiveWeb3React();

  const tx = useTransaction(hash);
  const theme = useContext(ThemeContext);

  if (!tx) return null;
  const success = Boolean(tx.receipt && tx.receipt.status === 1);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.green1} size={24} /> : <AlertCircle color={theme.red1} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <ThemedText.Body fontWeight={500}>
          <TransactionSummary info={tx.info} />
        </ThemedText.Body>
        {chainId && (
          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            View on Explorer
          </ExternalLink>
        )}
      </AutoColumn>
    </RowNoFlex>
  );
}
