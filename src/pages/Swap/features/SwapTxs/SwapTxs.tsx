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
  const [txBurnID, setTxBurnID] = React.useState<string | undefined>(undefined);

  const factories: IItemDetail[] = React.useMemo(() => {
    const _txDetail: any = state.txs.find((tx) => tx.requestBurnTxInc === txBurnID);
    if (!_txDetail) return [];
    const chainId = getChainIDByAcronymNetwork(_txDetail.network);
    return [
      {
        title: 'RequestTx:',
        desc: !!_txDetail.requestBurnTxInc ? shortenString(_txDetail.requestBurnTxInc || '', 10) : '',
        copyData: _txDetail.requestBurnTxInc,
        link: `${getExplorerLink(
          PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
          _txDetail.requestBurnTxInc,
          ExplorerDataType.TRANSACTION
        )}`,
        disabled: !_txDetail.requestBurnTxInc,
      },
      {
        title: 'Request status:',
        desc: _txDetail.burnTxStatus,
        disabled: !_txDetail.burnTxStatus,
      },
      {
        title: 'Rate:',
        desc: _txDetail.rateStr,
        disabled: !_txDetail.rateStr,
      },
      {
        title: 'Status:',
        desc: _txDetail.status,
        descColor: _txDetail.color,
      },
      {
        title: 'Sell:',
        desc: `${_txDetail.sellStr} (${_txDetail.sellNetwork})`,
        disabled: !_txDetail.sellStr,
      },
      {
        title: 'Buy:',
        desc: `${_txDetail.buyStr} (${_txDetail.buyNetwork})`,
        disabled: !_txDetail.buyStr,
      },
      {
        title: 'OutChain Tx:',
        desc: !!_txDetail.outchainTx ? shortenString(_txDetail.outchainTx || '', 10) : '',
        copyData: _txDetail.outchainTx,
        link: `${getExplorerLink(chainId || 0, _txDetail.outchainTx || '', ExplorerDataType.TRANSACTION)}`,
        disabled: !_txDetail.outchainTx,
      },
      {
        title: 'pAppTx:',
        desc: !!_txDetail.pAppTxID ? shortenString(_txDetail.pAppTxID || '', 10) : '',
        disabled: !_txDetail.pAppTxID,
        copyData: _txDetail.pAppTxID,
        link: `${getExplorerLink(
          PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
          _txDetail.pAppTxID,
          ExplorerDataType.TRANSACTION
        )}`,
      },
      {
        title: 'pDexTx:',
        desc: !!_txDetail.pDexTxID ? shortenString(_txDetail.pDexTxID || '', 10) : '',
        disabled: !_txDetail.pDexTxID,
        copyData: _txDetail.pDexTxID,
        link: `${getExplorerLink(
          PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
          _txDetail.pDexTxID,
          ExplorerDataType.TRANSACTION
        )}`,
      },
      {
        title: 'Swap status:',
        desc: _txDetail.swapExchangeStatus,
        disabled: !_txDetail.swapExchangeStatus,
      },
      {
        title: 'Refund Tx:',
        desc: !!_txDetail.refundTxID ? shortenString(_txDetail.refundTxID || '', 10) : '',
        disabled: !_txDetail.refundTxID,
      },
      {
        title: 'Refund:',
        desc: _txDetail.refundStr,
        disabled: !_txDetail.refundStr,
      },
      {
        title: 'RedepositTx:',
        desc: !!_txDetail.redepositTxInc ? shortenString(_txDetail.redepositTxInc || '', 10) : '',
        copyData: _txDetail.redepositTxInc,
        link: !!_txDetail.redepositTxInc
          ? `${getExplorerLink(
              PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO,
              _txDetail.redepositTxInc,
              ExplorerDataType.TRANSACTION
            )}`
          : '',
        disabled: !_txDetail.redepositTxInc,
      },
      {
        title: 'Redeposit status:',
        desc: _txDetail.redepositStatus,
        // descColor: txDetail.redepositColor,
        disabled: !_txDetail.redepositStatus,
      },
    ];
  }, [txBurnID]);

  const getSwapTxs = async ({ showLoading = false }: { showLoading: boolean }) => {
    try {
      if (showLoading) {
        setState((value) => ({ ...value, loading: true }));
      }
      const txs = await rpcClient.apiGetSwapTxs();
      if (showLoading) {
        setState((value) => ({ ...value, loading: false, txs }));
      }
    } catch (e) {
      if (showLoading) {
        setState((value) => ({ ...value, loading: false, txs: [] }));
      }
    }
  };

  const renderItem = (tx: ISwapTxStatus) => {
    return (
      <div
        className="item button-hover"
        key={tx.requestBurnTxInc}
        onClick={() => {
          setTxBurnID(tx.requestBurnTxInc);
        }}
      >
        <RowBetween>
          <ThemedText.SmallLabel marginTop="4px" fontWeight={500}>
            {tx.swapStr}
          </ThemedText.SmallLabel>
          <ThemedText.SmallLabel fontWeight={500} style={{ color: tx.color }}>
            {capitalizeFirstLetter(tx.status)}
          </ThemedText.SmallLabel>
        </RowBetween>
        <RowBetween style={{ marginTop: '6px' }}>
          <ThemedText.SmallLabel fontWeight={500} color="primary8">
            {shortenString(`#${tx.requestBurnTxInc}`, 10)}
          </ThemedText.SmallLabel>
          <ThemedText.SmallLabel fontWeight={500} color="primary8">
            {`${tx.appName}`}
          </ThemedText.SmallLabel>
        </RowBetween>
      </div>
    );
  };

  const renderHistoryList = () => state.txs.map(renderItem);

  const renderUI = () => {
    if (txBurnID) {
      return (
        <>
          <ArrowLeft
            style={{ marginBottom: '12px', cursor: 'pointer', color: 'white' }}
            onClick={() => setTxBurnID(undefined)}
          />
          {factories.map((item: IItemDetail) => (
            <ItemDetail key={item.title} {...item} />
          ))}
        </>
      );
    }
    return renderHistoryList();
  };

  const jobLoadHistory = async () => {
    await getSwapTxs({ showLoading: true });
    // setInterval(async () => {
    //   await getSwapTxs({ showLoading: false });
    // }, 30000);
  };

  React.useEffect(() => {
    jobLoadHistory().then();
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
