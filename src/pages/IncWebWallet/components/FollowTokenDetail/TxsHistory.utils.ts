// import { SelectedPrivacy } from 'state/followTokens';
import convert from 'utils/convert';
import format from 'utils/format';

import { IHistory, IHistoryFromSDK } from './TxsHistory.interfaces';

const getTxsHistoryBuilder = ({
  txsHistory = [],
  selectedPrivacy,
}: {
  txsHistory: IHistoryFromSDK[];
  selectedPrivacy: any;
}): IHistory[] => {
  return txsHistory.map((history) => {
    const _formatedAmount = format.amountVer2({
      originalAmount: convert.toNumber({ text: history.amount }),
      decimals: selectedPrivacy.pDecimals,
    });

    const _formatedFee = format.formatAmount({
      originalAmount: convert.toNumber({ text: (history.fee || 0).toString() }),
      decimals: 9,
      clipAmount: false,
    });

    const _formatedTime = format.formatDateTime({
      dateTime: history.time,
    });
    let statusColor;
    if (history.statusStr === 'Failed') {
      statusColor = '#FD4040';
    } else if (history.statusStr === 'Success') {
      statusColor = '#27AE60';
    } else {
      statusColor = '#ffffff';
    }

    return {
      amountStr: `${_formatedAmount} ${selectedPrivacy.symbol}`,
      feeStr: `${_formatedFee} PRV`,
      memo: history.memo,
      receiverAddress: history.receiverAddress,
      statusStr: history.statusStr,
      timeStr: _formatedTime,
      txID: history.txId,
      txTypeStr: history.txTypeStr,
      statusColor,
    };
  });
};

export { getTxsHistoryBuilder };
