import Loader from 'components/Core/Loader';
import { RowBetween } from 'components/Core/Row';
import React from 'react';
import rpcClient from 'services/rpcClient';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { shortenString } from 'utils';

import { ISwapTxStatus } from './SwapTxs.utils';

interface IState {
  loading: boolean;
  txs: ISwapTxStatus[];
}

const Styled = styled.div`
  overflow-y: auto;
  .loader {
    left: 45%;
  }
  .item {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .item:first-child {
    padding-top: 0;
  }
`;

const SwapTxs = React.memo(() => {
  const [state, setState] = React.useState<IState>({ loading: true, txs: [] });

  const getSwapTxs = async () => {
    try {
      setState((value) => ({ ...value, loading: true }));
      const txs = await rpcClient.apiGetSwapTxs();
      setState({ loading: false, txs });
    } catch (e) {
      setState({ loading: false, txs: [] });
    }
  };

  const renderItem = (tx: ISwapTxStatus) => {
    return (
      <div className="item button-hover">
        <RowBetween key={tx.requestBurnTxInc}>
          <ThemedText.SmallLabel fontWeight={500} color="primary8">
            {shortenString(`#${tx.requestBurnTxInc}`, 10)}
          </ThemedText.SmallLabel>
          <ThemedText.SmallLabel fontWeight={500} style={{ color: tx.color }}>
            {tx.status}
          </ThemedText.SmallLabel>
        </RowBetween>
        <ThemedText.SmallLabel marginTop="4px" fontWeight={500}>
          {tx.time}
        </ThemedText.SmallLabel>
      </div>
    );
  };

  React.useEffect(() => {
    getSwapTxs().then();
  }, []);

  return (
    <Styled>
      {state.loading && <Loader />}
      {state.txs.map(renderItem)}
    </Styled>
  );
});

SwapTxs.displayName = 'SwapTxs';

export default SwapTxs;
