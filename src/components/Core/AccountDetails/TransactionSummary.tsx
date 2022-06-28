import { TransactionInfo } from 'state/transactions/types';

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  switch (info.type) {
    default:
      return <div />;
  }
}
