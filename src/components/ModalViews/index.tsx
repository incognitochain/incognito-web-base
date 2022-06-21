import { CloseIcon, SpinnerIcon } from '@components/Icons';
import Circle from '@images/blue-loader.svg';
import {
  AutoColumn,
  ColumnCenter,
  ExternalLink,
  RowBetween,
  ThemedText,
} from '@src/components';
import { ExplorerDataType, getExplorerLink } from '@src/utils';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useContext } from 'react';
import { ArrowUpCircle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components/macro';

const ConfirmOrLoadingWrapper = styled.div`
  width: 100%;
  padding: 24px;
`;

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`;

export function LoadingView({
  children,
  onDismiss,
}: {
  children: any;
  onDismiss: () => void;
}) {
  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <SpinnerIcon src={Circle} alt="loader" size={'90px'} />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        {children}
        <ThemedText.SubHeader>
          Confirm this transaction in your wallet
        </ThemedText.SubHeader>
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  );
}

export function SubmittedView({
  children,
  onDismiss,
  hash,
}: {
  children: any;
  onDismiss: () => void;
  hash: string | undefined;
}) {
  const theme = useContext(ThemeContext);
  const { chainId } = useActiveWeb3React();

  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <ArrowUpCircle strokeWidth={0.5} size={90} color={theme.content4} />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        {children}
        {chainId && hash && (
          <ExternalLink
            href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
            style={{ marginLeft: '4px' }}
          >
            <ThemedText.SubHeader>View transaction on Explorer</ThemedText.SubHeader>
          </ExternalLink>
        )}
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  );
}
