import { Modal } from 'antd';
import withBlur from 'pages/IncWebWallet/hoc/withBlur';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components/macro';
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

const ModalContainer = styled.div`
  background-color: #303030;
  text-align: center;
`;

const Box = styled.div`
  padding: 32px;
  box-shadow: 0px 4px 12px #404040;
  margin-top: 32px;
  border-radius: 8px;
`;

const PhraseText = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface ModalPhraseProps {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  children?: React.ReactNode;
}

const ModalPhrase = (props: ModalPhraseProps) => {
  const { data, isModalOpen, onCloseModal } = props;
  const words = data?.mnemonic;

  const renderMainContent = (): any => {
    return (
      <ModalContainer>
        <h5>Reveal Seed Words</h5>
        <Box>
          <PhraseText>{words}</PhraseText>
        </Box>
      </ModalContainer>
    );
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      centered
      width={960}
      footer={null}
      destroyOnClose={true}
      bodyStyle={{ padding: 24, borderRadius: 16, backgroundColor: '#303030' }}
      closeIcon={<IoCloseOutline size={24} color="#FFFFFF" />}
      onCancel={() => onCloseModal?.()}
    >
      {withBlur(renderMainContent)(props)}
    </ModalWrapper>
  );
};

export default ModalPhrase;
