import { useModal } from 'components/Modal';
import CONSTANT_CONFIGS from 'pages/IncWebWallet/constants/config';
import useFollowTokenSelected from 'pages/IncWebWallet/hooks/useFollowTokenSelected';
import styled from 'styled-components/macro';
import { ellipsisCenter } from 'utils';

import HistoryItem, { IHistoryItem } from '../../../components/HistoryItem/index';
import NavigationHeader from '../../../components/NavigationHeader/NavigationHeader';
import { IConfirmTx } from './TransactionReceipt.interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
`;

type Props = {
  transactionReceiptData?: IConfirmTx & any;
  onClose?: () => void;
  infosFactories?: IHistoryItem[];
};

const TransactionReceipt = (props: Props) => {
  const { closeModal } = useModal();
  const { transactionReceiptData: confirmTx = {}, onClose } = props;
  const { tokenID: selectedPrivacyTokenId, symbol, network, shortName, isVerified } = useFollowTokenSelected();

  const itemsFactories: IHistoryItem[] = [
    {
      title: 'TxID:',
      desc: ellipsisCenter({ str: confirmTx.txID, limit: 7 }),
      copyData: confirmTx.txID,
      link: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${confirmTx.txID}`,
    },
    {
      title: 'Receiver:',
      desc: ellipsisCenter({ str: confirmTx.address, limit: 8 }),
      copyData: confirmTx.address,
    },
    {
      title: 'Time:',
      desc: confirmTx.time,
    },
    {
      title: 'Amount:',
      desc: `${confirmTx.formatedAmount}`,
    },
    {
      title: 'Network fee:',
      desc: `${confirmTx.formatedNetworkFee}`,
    },
  ];

  return (
    <Container>
      <NavigationHeader
        leftTitle={'Transaction Receipt'}
        onBack={() => {
          closeModal();
          onClose && onClose();
        }}
      />
      {itemsFactories.map((item: IHistoryItem) => (
        <HistoryItem key={item.title} {...item} />
      ))}
    </Container>
  );
};

export default TransactionReceipt;
