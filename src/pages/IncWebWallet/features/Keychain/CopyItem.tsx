import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import styled from 'styled-components/macro';

interface CopyItemProps {
  label: string;
  value: string;
  handleClickQrCode?: () => void;
}

const Container = styled.div`
  width: 100%;
  padding: 16px 0px;
  border-bottom: 1px solid #363636;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const Value = styled.p`
  font-size: 14x;
  font-weight: 500;
  color: #9c9c9c;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
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

const CopyItem = (props: CopyItemProps) => {
  const { label, value, handleClickQrCode } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (value: string) => {
    copy(value);
    messageApi.open({
      type: 'success',
      content: 'Copied',
    });
  };
  return (
    <Container>
      {contextHolder}
      <LabelContainer>
        <Label>{label}</Label>
        <RightLabelContainer>
          <ButtonCopy onClick={() => handleCopy(value)}>
            <MdContentCopy size={20} color="#FFFFFF" />
          </ButtonCopy>
          <ButtonQrCode>
            <MdQrCode size={20} color="#FFFFFF" />
          </ButtonQrCode>
        </RightLabelContainer>
      </LabelContainer>
      <Value>{value}</Value>
    </Container>
  );
};

export default CopyItem;
