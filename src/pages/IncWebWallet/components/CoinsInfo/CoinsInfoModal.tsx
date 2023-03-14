import { Modal } from 'antd';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { getFollowTokenSelectedTokenSelector } from '../../state/followTokenSelected.selectors';
import HistoryItem, { IHistoryItem } from '../HistoryItem';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import enhance from './CoinsInfoModal.enhance';
const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    background: ${({ theme }) => theme.color_grey1};
    border-radius: 20px;
    width: 430px;
  }
`;

const Container = styled.div<{ isVerified: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};

  .verify {
    color: ${({ theme, isVerified }: { theme: any; isVerified: boolean }) => (isVerified ? '#34C759' : '#FF9500')};
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .name-text {
    margin-bottom: 6px;
  }
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  infosFactories?: IHistoryItem[];
}

const CoinsInfoModal = (props: Props & any): any => {
  const { isModalOpen, onCloseModal, infosFactories = [] } = props;

  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const { symbol, network, shortName, isVerified } = followTokenSelected;

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
      <Container isVerified>
        <NavigationHeader
          leftTitle={'Coin Info'}
          onBack={() => {
            onCloseModal?.();
          }}
        />

        <p className="name-text fs-supermedium fw-bold fs-medium">{shortName}</p>
        <p className="fs-regular">{`${symbol} (${network ? network : 'Incognito'})`}</p>
        <p className="verify fw-medium fs-medium">{isVerified ? 'Verified' : 'Unverified'}</p>
        {infosFactories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}
      </Container>
    </ModalWrapper>
  );
};

export default enhance(CoinsInfoModal);
