import Loader from 'components/Core/Loader';
import { RowBetween } from 'components/Core/Row';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import rpcClient from 'services/rpcClient';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { shortenString } from 'utils';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';
import { getChainIDByAcronymNetwork } from 'utils/token';

import ItemDetail, { IItemDetail } from '../ItemDetail';
import { capitalizeFirstLetter } from '../ItemDetail/ItemDetail';
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
  const [txDetail, setTxDetail] = React.useState<ISwapTxStatus | undefined>(undefined);

  const factories: IItemDetail[] = React.useMemo(() => {
    if (!txDetail) return [];
    const chainId = getChainIDByAcronymNetwork(txDetail.network);
    return [
      {
        title: 'Status:',
        desc: txDetail.status,
        descColor: txDetail.color,
      },
      {
        title: 'BurnTx:',
        desc: !!txDetail.requestBurnTxInc ? shortenString(txDetail.requestBurnTxInc || '', 10) : '',
        copyData: txDetail.requestBurnTxInc,
        link: `${getExplorerLink(
          PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
          txDetail.requestBurnTxInc,
          ExplorerDataType.TRANSACTION
        )}`,
        disabled: !txDetail.requestBurnTxInc,
      },
      {
        title: 'Burn status:',
        desc: txDetail.burnTxStatus,
        // descColor: txDetail.burnColor,
        disabled: !txDetail.burnTxStatus,
      },
      {
        title: 'OutChainTx:',
        desc: !!txDetail.outchainTx ? shortenString(txDetail.outchainTx || '', 10) : '',
        copyData: txDetail.outchainTx,
        link: `${getExplorerLink(chainId || 0, txDetail.outchainTx || '', ExplorerDataType.TRANSACTION)}`,
        disabled: !txDetail.outchainTx,
      },
      {
        title: 'OutChain status:',
        desc: txDetail.outchainTxStatus,
        // descColor: txDetail.outchainColor,
        disabled: !txDetail.outchainTxStatus,
      },
      {
        title: 'Swap status:',
        desc: txDetail.swapExchangeStatus,
        // descColor: txDetail.swapExchangeColor,
        disabled: !txDetail.swapExchangeStatus,
      },
      {
        title: 'RedepositTx:',
        desc: !!txDetail.redepositTxInc ? shortenString(txDetail.redepositTxInc || '', 10) : '',
        copyData: txDetail.redepositTxInc,
        link: !!txDetail.redepositTxInc
          ? `${getExplorerLink(
              PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
              txDetail.redepositTxInc,
              ExplorerDataType.TRANSACTION
            )}`
          : '',
        disabled: !txDetail.redepositTxInc,
      },
      {
        title: 'Redeposit status:',
        desc: txDetail.redepositStatus,
        // descColor: txDetail.redepositColor,
        disabled: !txDetail.redepositStatus,
      },
    ];
  }, [txDetail]);

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
      <div
        className="item button-hover"
        onClick={() => {
          setTxDetail(tx);
        }}
      >
        <RowBetween key={tx.requestBurnTxInc}>
          <ThemedText.SmallLabel fontWeight={500} color="primary8">
            {shortenString(`#${tx.requestBurnTxInc}`, 10)}
          </ThemedText.SmallLabel>
          <ThemedText.SmallLabel fontWeight={500} style={{ color: tx.color }}>
            {capitalizeFirstLetter(tx.status)}
          </ThemedText.SmallLabel>
        </RowBetween>
        <ThemedText.SmallLabel marginTop="4px" fontWeight={500}>
          {tx.time}
        </ThemedText.SmallLabel>
      </div>
    );
  };

  const renderHistoryList = () => state.txs.map(renderItem);

  const renderUI = () => {
    if (txDetail) {
      return (
        <>
          <ArrowLeft style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => setTxDetail(undefined)} />
          {factories.map((item: IItemDetail) => (
            <ItemDetail key={item.title} {...item} />
          ))}
        </>
      );
    }
    return renderHistoryList();
  };

  React.useEffect(() => {
    getSwapTxs().then();
  }, []);

  return (
    <Styled>
      {state.loading && <Loader />}
      {renderUI()}
    </Styled>
  );
});

SwapTxs.displayName = 'SwapTxs';

export default SwapTxs;
