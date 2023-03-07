import { message, Modal } from 'antd';
import copy from 'copy-to-clipboard';
import { IoCloseOutline } from 'react-icons/io5';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import styled from 'styled-components/macro';
interface ExportItem {
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

const ExportItem = (props: ExportItem) => {
  const { label, data, onPress, onPressQRCode } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const onCopy = (text: string) => {
    copy(text);
    messageApi.open({
      type: 'success',
      content: 'Copied',
    });
  };
  return (
    <ExportItemContainer>
      {contextHolder}
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

interface ModalAccountDetailProps {
  account?: any;
  token?: any;
  title?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ModalAccountDetail = (props: ModalAccountDetailProps) => {
  const { account, isModalOpen, onCloseModal } = props;
  const renderItem = (label: any, value: any) =>
    value ? <ExportItem label={label} data={value} onPress={() => null} onPressQRCode={() => null} /> : null;
  return (
    <ModalWrapper
      open={isModalOpen}
      centered
      width={600}
      footer={null}
      bodyStyle={{ padding: 24, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => onCloseModal?.()}
    >
      <div style={{ flex: 1, backgroundColor: '#303030' }}>
        <h5>{account?.name} keys</h5>
        {renderItem('Your incognito address', account?.PaymentAddress)}
        {renderItem('Private key', account?.PrivateKey)}
        {renderItem('Public key', account?.PublicKeyCheckEncode)}
        {renderItem('Readonly key', account?.ReadonlyKey)}
        {renderItem('Validator key', account?.ValidatorKey)}
        {renderItem('Validator Public key', account?.BLSPublicKey)}
        {renderItem('OTA key', account?.OTAKey)}
        {renderItem('ID', account?.ID.toString())}
      </div>
    </ModalWrapper>
  );
};
