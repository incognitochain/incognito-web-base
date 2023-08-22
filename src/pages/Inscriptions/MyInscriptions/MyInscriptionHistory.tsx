import { orderBy } from 'lodash';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import React, { useEffect, useMemo, useState } from 'react';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { useAppSelector } from 'state/hooks';

import { Container } from '../MyInscriptions/MyInscriptionHistory.styled';
import MyInscriptionHistoryItem from '../MyInscriptions/MyInscriptionHistoryItem';

type Props = {
  showDrawer: any;
};

const MyInscriptionHistory = (props: Props) => {
  const accountSender = useAppSelector(defaultAccountWalletSelector);

  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const isEmpty = useMemo(() => {
    if (!historyList || historyList.length < 1) return true;
    return false;
  }, [historyList]);

  const loadHistoryLocal = async () => {
    try {
      setLoading(true);
      if (accountSender) {
        let listHistory = await accountService.getInscriptionsHistory({ accountWallet: accountSender });
        listHistory = orderBy(listHistory, ['timestamp'], ['desc']);
        setHistoryList(listHistory);
      } else {
        setHistoryList([]);
      }
    } catch (error) {
      console.log('[loadHistoryLocal] ERROR: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoryLocal();
  }, [accountSender]);

  const renderItem = (item: any, index: number) => {
    return <MyInscriptionHistoryItem item={item} index={index}></MyInscriptionHistoryItem>;
  };

  if (loading) return <></>;
  if (isEmpty) return <></>;

  return <Container>{historyList && historyList.map((item, index) => renderItem(item, index))}</Container>;
};

export default React.memo(MyInscriptionHistory);
