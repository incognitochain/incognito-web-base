import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import CoinsInfoModal from '../CoinsInfo/CoinsInfoModal';
import Header from './components/Header';
import HistoryList from './components/HistoryList';
import TokenBalanceDetail from './components/TokenBalanceDetail';

const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    background: ${({ theme }) => theme.color_grey1};
    border-radius: 20px;
    width: 430px;
  }

  .container {
    background-color: ${({ theme }) => theme.color_grey1};
  }

  .space {
    width: 10px;
  }
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

const FollowTokenDetail = (props: Props) => {
  const dispatch = useDispatch();
  const { data, isModalOpen, onCloseModal } = props;
  const [isShowCoinsInfo, setShowCoinsInfo] = useState(false);
  return (
    <ModalWrapper
      open={isModalOpen}
      footer={null}
      style={{ top: 42, right: 0, left: 45 }}
      closable={false}
      maskClosable={false}
      onCancel={() => onCloseModal?.()}
      destroyOnClose={true}
    >
      <div className="container">
        <Header onCloseModal={onCloseModal} onClickCoinInfo={() => setShowCoinsInfo(true)}></Header>
        <TokenBalanceDetail />
        <HistoryList />

        {/* Modal  */}
        {isShowCoinsInfo && (
          <CoinsInfoModal isModalOpen={isShowCoinsInfo} onCloseModal={() => setShowCoinsInfo(false)} />
        )}
      </div>
    </ModalWrapper>
  );
};

export default FollowTokenDetail;
