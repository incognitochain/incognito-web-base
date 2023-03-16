import { getFollowTokenSelectedTokenSelector } from 'pages/IncWebWallet/state/followTokenSelected.selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

import { IHistory, IHistoryFromSDK } from '../TxsHistory.interfaces';
import { getTxsHistoryBuilder } from '../TxsHistory.utils';
import { HistoryItem } from './HistoryItem';
const { PrivacyVersion } = require('incognito-chain-web-js/build/web/wallet');

const Container = styled.div`
  margin-top: 30px;
  min-height: 270px;
  background-color: ${({ theme }) => theme.color_grey1};
`;

interface Props {}

const HistoryList = (props: Props) => {
  const selectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const [histories, setHistories] = React.useState<IHistory[]>([]);
  // const colors = useSelector(colorsSelector);
  const accountSender = useSelector(defaultAccountWalletSelector);

  const handleLoadHistory = async () => {
    if (accountSender) {
      const { txsTransactor }: { txsTransactor: IHistoryFromSDK[] } = await accountSender.getTxsHistory({
        tokenID: selectedPrivacy.tokenID,
        isPToken: false,
        version: PrivacyVersion.ver3,
      });
      const data = getTxsHistoryBuilder({ txsHistory: txsTransactor, selectedPrivacy });
      setHistories(data);
    }
  };

  React.useEffect(() => {
    handleLoadHistory();
  }, [selectedPrivacy.tokenID]);

  const renderItem = (history: IHistory) => <HistoryItem history={history} key={history.txID} />;

  return <Container>{histories?.map(renderItem)}</Container>;
};

export default HistoryList;
