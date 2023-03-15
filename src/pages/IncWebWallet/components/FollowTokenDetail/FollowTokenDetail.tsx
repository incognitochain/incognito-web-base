import { Modal } from 'antd';
import { useModal } from 'components/Modal';
import { useState } from 'react';
import styled from 'styled-components/macro';

import FormSendPage from '../../features/Send';
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
  const { isModalOpen, onCloseModal } = props;
  const [isShowCoinsInfo, setShowCoinsInfo] = useState(false);
  const [isShowSendForm, setShowSendForm] = useState(false);
  const [isShowReceive, setShowReceive] = useState(false);
  const { setModal, closeModal } = useModal();

  const renderWithModal = (children: any) => {
    return (
      <ModalWrapper
        open={isModalOpen}
        footer={null}
        style={{ top: 42, right: 0, left: 45 }}
        closable={false}
        maskClosable={false}
        onCancel={() => onCloseModal?.()}
      >
        {children}
      </ModalWrapper>
    );
  };

  const renderMainContent = () => {
    return (
      <div className="container">
        <Header
          onCloseModal={() => {
            closeModal();
          }}
          onClickCoinInfo={() => setShowCoinsInfo(true)}
        ></Header>
        <TokenBalanceDetail
          onReceiveClick={() => setShowReceive(true)}
          onSendClick={() => {
            // Modal.info({
            //   content: <FormSendModal />,
            // });

            setModal({
              closable: false,
              data: <FormSendPage />,
              isTransparent: false,
              rightHeader: undefined,
              title: '',
              isSearchTokenModal: false,
              hideHeaderDefault: true,
            });
          }}
        />
        <HistoryList />

        {/* Modal  */}
        {isShowCoinsInfo && (
          <CoinsInfoModal isModalOpen={isShowCoinsInfo} onCloseModal={() => setShowCoinsInfo(false)} />
        )}

        {/* Modal  */}
        {/* {isShowSendForm && <FormSendPage isModalOpen={isShowSendForm} onCloseModal={() => setShowSendForm(false)} />} */}

        {/* Modal  */}
        {/* {isShowReceive && <CoinsInfoModal isModalOpen={isShowReceive} onCloseModal={() => setShowReceive(false)} />} */}
      </div>
    );
  };
  return renderMainContent();
};

export default FollowTokenDetail;
