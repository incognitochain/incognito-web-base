import { Modal } from 'antd';
import copy from 'copy-to-clipboard';
import { IoCloseOutline } from 'react-icons/io5';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';

interface ExportItemProps {
  label: string;
  data: any;
  onPress: () => void;
  onPressQRCode?: () => void;
}

const ModalWrapper = styled(Modal)`
  .ant-modal {
    border-radius: 20px;
  }

  .ant-modal-content {
    background: #303030;
    border-radius: 20px;
  }
`;

const ExportItemContainer = styled.div`
  padding: 8px 0px;
`;

const ExportItemTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemValue = styled.p`
  color: #9c9c9c;
`;

const ButtonCopy = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const ButtonQrCode = styled.div`
  margin-left: 8px;
  :hover {
    cursor: pointer;
  }
`;

const ExportItem = (props: ExportItemProps) => {
  const { label, data, onPress, onPressQRCode } = props;
  const onCopy = (text: string) => {
    copy(text);
    toast.success('Copied');
  };
  return (
    <ExportItemContainer>
      <ExportItemTopContainer>
        <p>{label}</p>
        <GroupButton>
          <ButtonCopy onClick={() => onCopy(data)}>
            <MdContentCopy size={20} color="#FFFFFF" />
          </ButtonCopy>
          <ButtonQrCode>
            <MdQrCode size={20} color="#FFFFFF" />
          </ButtonQrCode>
        </GroupButton>
      </ExportItemTopContainer>
      <ItemValue>{data}</ItemValue>
    </ExportItemContainer>
  );
};

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

type ModalTokenDetailProps = {
  account?: any;
  token?: any;
  title?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
};

const ModalTokenDetail = (props: ModalTokenDetailProps) => {
  const { account, isModalOpen, onCloseModal, token } = props;
  const renderItem = (label: any, value: any) =>
    value ? <ExportItem label={label} data={value} onPress={() => null} onPressQRCode={() => null} /> : null;
  return (
    <ModalWrapper
      open={isModalOpen}
      centered
      width={600}
      footer={null}
      title="SDSADASD"
      bodyStyle={{ padding: 24, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => onCloseModal?.()}
    >
      {}
    </ModalWrapper>
  );
};

export default ModalTokenDetail;
