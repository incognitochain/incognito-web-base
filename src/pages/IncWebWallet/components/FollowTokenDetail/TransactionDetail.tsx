import { useModal } from 'components/Modal';
import CONSTANT_CONFIGS from 'pages/IncWebWallet/constants/config';
import React from 'react';
import styled from 'styled-components/macro';
import { ellipsisCenter } from 'utils';

import { IHistoryItem } from '../HistoryItem';
import { CopyIcon, OpenLinkIcon } from '../Icons';
import NavigationHeader from '../NavigationHeader/NavigationHeader';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0px;
`;

const ItemRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.white};
`;

export const Item = React.memo((props: IHistoryItem) => {
  const { customItem, title, desc, copyData = '', link = '', descColor = '', disabled = false } = props;

  const handleOpenLink = () => window.open(link);
  if (disabled) {
    return null;
  }
  if (customItem) {
    return customItem;
  }
  if (!desc) {
    return null;
  }
  return (
    <ItemContainer>
      <ItemTitle>{title}</ItemTitle>
      <ItemRightContainer>
        <ItemTitle style={{ color: descColor }}>{desc}</ItemTitle>
        {!!copyData && <CopyIcon text={copyData} />}
        {!!link && <OpenLinkIcon onClick={handleOpenLink} />}
      </ItemRightContainer>
    </ItemContainer>
  );
});

const TransactionDetailContainer = styled.div`
  min-height: 600px;
`;

const TransactionDetail = (props: any) => {
  const { history } = props;
  const factories: IHistoryItem[] = React.useMemo(() => {
    return [
      {
        title: 'TxID:',
        desc: ellipsisCenter({ limit: 7, str: history.txID }),
        copyData: history.txID,
        link: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history.txID}`,
      },
      {
        title: 'Receiver:',
        desc: ellipsisCenter({ limit: 8, str: history.receiverAddress }),
        copyData: history.receiverAddress,
      },
      {
        title: 'Amount:',
        desc: history.amountStr,
      },
      {
        title: 'Status:',
        desc: history.statusStr,
        descColor: history.statusColor,
      },
      {
        title: 'Type:',
        desc: history.txTypeStr,
      },
      {
        title: 'Fee:',
        desc: history.feeStr,
      },
    ];
  }, [history]);

  const { closeModal } = useModal();
  return (
    <TransactionDetailContainer>
      <NavigationHeader
        leftTitle={`${'Transaction detail'}`}
        onBack={() => {
          closeModal();
        }}
      />
      {factories.map((item: IHistoryItem) => (
        <Item key={item.title} {...item} />
      ))}
    </TransactionDetailContainer>
  );
};

export default TransactionDetail;
