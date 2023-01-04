import { BigNumber } from 'bignumber.js';
import isEmpty from 'lodash/isEmpty';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { NetworkTypePayload, SwapExchange } from 'pages/Swap/features/FormUnshield/FormUnshield.types';
import { ISwapTxStorage } from 'pages/Swap/Swap.storage';
import state from 'state';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import format from 'utils/format';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';
import { getChainIDByAcronymNetwork } from 'utils/token';

interface InterswapStatus {
  Status: string;
  PdexTxID: string;
  PappTxID: string;
  FromAmount: number;
  FromToken: string;
  ToAmount: number;
  ToToken: string;
  ResponseTxID: string;
  RefundAmount: number;
  RefundToken: string;
  RefundTxID: string;
  TxIDOutchain: string;
}

enum ExchangeStatus {
  reverted = 'reverted',
  success = 'success',
  failed = 'failed',
  pending = 'pending',
  unvailable = 'unvailable',
}

enum TxStatus {
  submitting = 'submitting',
  submit_failed = 'submit_failed',
  pending = 'pending',
  executing = 'executing',
  rejected = 'rejected',
  accepted = 'accepted',
  success = 'success',
  refund = 'refunded',
  refunding = 'refunding',
  submitFail = 'failed',
}

enum Status {
  success = 'success',
  processing = 'processing',
  fail = 'fail',
  reverted = 'reverted',
}

export interface ISwapTxStatus {
  requestBurnTxInc: string;
  burnTxStatus: TxStatus;
  burnColor: string;

  outchainTx: string;
  outchainTxStatus: string;
  outchainColor: string;

  swapExchangeStatus: ExchangeStatus;
  swapExchangeColor: string;

  isRedeposit: boolean;
  redepositTxInc: string;
  redepositStatus: TxStatus;
  redepositColor: string;

  status: Status;
  color: string;
  time: string;
  network: string;

  swapStr: string;
  rateStr: string;

  sellAmountText: string;
  buyAmountText: string;

  buyTokenID: string;
  sellTokenID: string;

  sellStr: string;
  buyStr: string;

  appName: string;

  sellNetwork: string;
  buyNetwork: string;
}

const getStatusColor = (status: string) => {
  let color = '#FFC043';
  if (!status) return '#FFC043';
  switch (status.toLowerCase()) {
    case Status.fail:
    case TxStatus.submit_failed:
    case TxStatus.rejected:
    case TxStatus.submitFail:
      color = '#F6465D';
      break;
    case Status.processing:
    case Status.reverted:
    case TxStatus.pending:
    case TxStatus.submitting:
    case TxStatus.executing:
    case TxStatus.refund:
      color = '#FFC043';
      break;
    case Status.success:
    case TxStatus.accepted:
    case TxStatus.success:
    case TxStatus.refunding:
      color = '#34C759';
      break;
  }
  return color;
};

const combineSwapPAppAndOpenSea = ({ swapTxs, curr }: { swapTxs: any; curr: any }) => {
  const apiResp: any = swapTxs[curr.txHash];
  if (!apiResp || isEmpty(apiResp)) return undefined;

  const defaultStatus = new Date().getTime() - curr.time > 60000 ? TxStatus.rejected : TxStatus.pending;
  let _appName = '';
  switch (curr.appName) {
    case SwapExchange.PDEX:
      _appName = 'Incognito';
      break;
    default:
      _appName = curr.appName.charAt(0).toUpperCase() + curr.appName.slice(1);
      break;
  }
  let tx: any = {
    requestBurnTxInc: curr.txHash,
    burnTxStatus: apiResp.inc_request_tx_status || defaultStatus,
    burnColor: getStatusColor(apiResp.inc_request_tx_status || defaultStatus),
    time: format.formatDateTime({ dateTime: curr.time || new Date().getTime() }),
    sellTokenID: curr.sellTokenID,
    buyTokenID: curr.buyTokenID,
    sellAmountText: curr.sellAmountText,
    buyAmountText: curr.buyAmountText,
    appName: _appName,
  };

  if (apiResp.network_result && !isEmpty(apiResp.network_result)) {
    const networkStatus = apiResp.network_result[0];
    tx = {
      ...tx,
      outchainTx: networkStatus.swap_tx,
      outchainTxStatus: networkStatus.swap_tx_status,
      outchainColor: getStatusColor(networkStatus.swap_tx_status),

      swapExchangeStatus: networkStatus.swap_outcome,
      swapExchangeColor: getStatusColor(networkStatus.swap_outcome),

      isRedeposit: !!networkStatus.is_redeposit,
      redepositTxInc: networkStatus.redeposit_inctx,
      redepositStatus: networkStatus.redeposit_status,
      redepositColor: getStatusColor(networkStatus.redeposit_status),

      network: networkStatus.network,
    };
  }

  if (!!apiResp.swap_detail) {
    const swapDetail = apiResp.swap_detail;
    tx = {
      ...tx,
      sellTokenID: swapDetail.token_in || tx.sellTokenID,
      buyTokenID: swapDetail.token_out || tx.buyTokenID,
      sellAmountText: swapDetail.in_amount || tx.sellAmountText,
      buyAmountText: swapDetail.out_amount || tx.buyAmountText,
    };
  }

  if (tx.sellTokenID && tx.buyTokenID) {
    const sellToken: SelectedPrivacy = getPrivacyDataByTokenIDSelector(state.getState())(tx.sellTokenID);
    const buyToken: SelectedPrivacy = getPrivacyDataByTokenIDSelector(state.getState())(tx.buyTokenID);
    const sellStr = `${format.amountVer2({ originalAmount: tx.sellAmountText, decimals: 0 })} ${sellToken.symbol}`;
    const buyStr = `${format.amountVer2({ originalAmount: tx.buyAmountText, decimals: 0 })} ${buyToken.symbol}`;
    if (sellToken.symbol && buyToken.symbol) {
      const swapStr = `${sellStr} = ${buyStr}`;
      const rateStr = `1 ${sellToken.symbol} = ${format.amountVer2({
        originalAmount: new BigNumber(tx.buyAmountText).div(tx.sellAmountText).toNumber(),
        decimals: 0,
      })} ${buyToken.symbol}`;
      const buyNetwork = buyToken.network;
      const sellNetwork = sellToken.network;
      tx = {
        ...tx,
        sellStr,
        buyStr,
        swapStr,
        rateStr,
        sellNetwork,
        buyNetwork,
      };
    } else {
      return undefined;
    }
  }

  if (tx.sellTokenID === undefined && tx.buyTokenID) {
    const buyToken: SelectedPrivacy = getPrivacyDataByTokenIDSelector(state.getState())(tx.buyTokenID);
    const buyStr = `${format.amountVer2({ originalAmount: tx.buyAmountText, decimals: 0 })} ${buyToken.symbol}`;
    if (buyToken.symbol) {
      const buyNetwork = buyToken.network;
      tx = {
        ...tx,
        buyStr,
        swapStr: buyStr,
        buyNetwork,
      };
    } else {
      return undefined;
    }
  }

  // inc_request_tx_status
  // -> bsc_swap_tx_status
  // -> bsc_swap_outcome
  // -> is_redeposit === true bsc_redeposit_status
  /** much case, please blame @lam */
  let swapStatus = Status.processing;
  const { burnTxStatus, outchainTxStatus, swapExchangeStatus, isRedeposit, redepositStatus, appName } = tx;
  switch (burnTxStatus) {
    case TxStatus.pending:
    case TxStatus.submitting:
    case TxStatus.executing:
      swapStatus = Status.processing; // processing
      break;
    case TxStatus.submit_failed:
    case TxStatus.rejected:
      swapStatus = Status.fail;
      break;
    case TxStatus.accepted: // <---
    case TxStatus.success:
      if (appName === SwapExchange.PDEX || appName === 'Incognito') {
        swapStatus = Status.success;
        break;
      }
      switch (outchainTxStatus) {
        case TxStatus.pending:
        case TxStatus.submitting:
        case TxStatus.executing:
          break; // processing
        case TxStatus.submit_failed:
        case TxStatus.rejected:
          swapStatus = Status.fail; // fail
          break;
        case TxStatus.accepted: // <---
        case TxStatus.success:
          switch (swapExchangeStatus) {
            case ExchangeStatus.pending:
              break; // processing
            case ExchangeStatus.failed:
            case ExchangeStatus.unvailable:
              swapStatus = Status.fail; // fail
              break;
            case ExchangeStatus.success:
            case ExchangeStatus.reverted: // <---
              if (isRedeposit) {
                switch (redepositStatus) {
                  case TxStatus.pending:
                  case TxStatus.submitting:
                  case TxStatus.executing:
                    break; // processing
                  case TxStatus.submit_failed:
                    swapStatus = Status.fail; // fail
                    break;
                  case TxStatus.accepted:
                  case TxStatus.success:
                    swapStatus = swapExchangeStatus === ExchangeStatus.success ? Status.success : Status.reverted;
                    break;
                }
              } else {
                swapStatus = Status.success;
              }
              break;
            default:
              swapStatus = Status.processing;
              break;
          }
          break;
        default:
          swapStatus = Status.processing;
          break;
      }
      break;
    default:
      swapStatus = Status.processing;
      break;
  }
  const data: ISwapTxStatus = {
    ...tx,
    status: swapStatus,
    color: getStatusColor(swapStatus),
  };

  return data;
};

const combineSwapInter = ({ swapTxs, curr }: { swapTxs: any; curr: any; prev: any }) => {
  const apiResp: InterswapStatus = swapTxs[curr.txHash];
  if (!apiResp || isEmpty(apiResp)) return undefined;
  const defaultStatus = new Date().getTime() - curr.time > 60000 ? TxStatus.submitFail : TxStatus.pending;
  const appName = curr.appName.charAt(0).toUpperCase() + curr.appName.slice(1);
  const status = apiResp?.Status || defaultStatus;
  const color = getStatusColor(status);

  if (!curr.sellTokenID || !curr.buyTokenID) return null;

  const sellAmountText = curr.sellAmountText;
  const buyAmountText = curr.buyAmountText;

  const sellToken: SelectedPrivacy = getPrivacyDataByTokenIDSelector(state.getState())(curr.sellTokenID);
  const buyToken: SelectedPrivacy = getPrivacyDataByTokenIDSelector(state.getState())(curr.buyTokenID);

  const sellStr = `${format.amountVer2({ originalAmount: sellAmountText, decimals: 0 })} ${sellToken.symbol}`;
  const buyStr = `${format.amountVer2({ originalAmount: buyAmountText, decimals: 0 })} ${buyToken.symbol}`;

  const swapStr = `${sellStr} = ${buyStr}`;

  const rateStr = `1 ${sellToken.symbol} = ${format.amountVer2({
    originalAmount: new BigNumber(buyAmountText).div(sellAmountText).toNumber(),
    decimals: 0,
  })} ${buyToken.symbol}`;

  const buyNetwork = buyToken.network;
  const sellNetwork = sellToken.network;

  let pDexTxID = apiResp.PdexTxID;
  let pAppTxID = apiResp.PappTxID;
  if (pDexTxID && pDexTxID === curr.txHash) {
    pDexTxID = '';
  }

  if (pAppTxID && pAppTxID === curr.txHash) {
    pAppTxID = '';
  }

  let refundStr, refundTxID;
  if (apiResp?.RefundTxID && apiResp?.RefundToken) {
    const refundToken = getPrivacyDataByTokenIDSelector(state.getState())(apiResp.RefundToken);
    if (refundToken.symbol) {
      refundTxID = apiResp?.RefundTxID;
      refundStr = `${format.amountVer2({
        originalAmount: apiResp?.RefundAmount || 0,
        decimals: refundToken.pDecimals || 0,
      })} ${refundToken.symbol}`;
    }
  }

  let outchainTxID, outchainTxIDUrl;
  if (apiResp?.TxIDOutchain) {
    const pAppNetwork = curr?.interPAppNetwork;
    const chainId = getChainIDByAcronymNetwork(pAppNetwork);
    outchainTxID = apiResp?.TxIDOutchain;
    outchainTxIDUrl = `${getExplorerLink(chainId, pAppTxID, ExplorerDataType.TRANSACTION)}`;
  }

  let responseTx;
  if (apiResp?.ResponseTxID) {
    responseTx = apiResp?.ResponseTxID;
  }

  const data: any = {
    status,

    pAppTxID,
    pDexTxID,

    pAppNetwork: curr?.interPAppNetwork || NetworkTypePayload.ETHEREUM,
    pAppName: curr?.interPAppName,

    color,

    appName,
    time: format.formatDateTime({ dateTime: curr.time || new Date().getTime() }),

    requestBurnTxInc: curr.txHash,

    sellAmountText,
    buyAmountText,

    sellStr,
    buyStr,

    swapStr,

    rateStr,

    buyNetwork,
    sellNetwork,

    refundTxID,
    refundStr,

    outchainTxID,
    outchainTxIDUrl,

    responseTx,
  };
  return data;
};

const combineSwapTxs = ({ localTxs, swapTxs }: { localTxs: ISwapTxStorage[]; swapTxs: any }) => {
  try {
    // @ts-ignore
    const txs: ISwapTxStatus[] = localTxs.reduce((prev, curr) => {
      const payload = {
        swapTxs,
        curr,
        prev,
      };
      const txMapper =
        curr.appName === SwapExchange.INTER_SWAP ? combineSwapInter(payload) : combineSwapPAppAndOpenSea(payload);
      if (txMapper) {
        return [...prev, txMapper];
      }
      return prev;
    }, []);
    return txs.filter((tx) => !!tx);
  } catch (e) {
    console.log('CombineSwapTxs error: ', e);
    return [];
  }
};

export { combineSwapTxs };
