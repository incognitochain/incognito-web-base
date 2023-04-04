import copy from 'copy-to-clipboard';
import { MdContentCopy, MdQrCode } from 'react-icons/md';
import { toast } from 'react-toastify';
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
  color: ${({ theme }) => theme.white};
`;

const Value = styled.p`
  font-size: 14x;
  font-weight: 500;
  color: ${({ theme }) => theme.text2};
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

  const handleCopy = (value: string) => {
    copy(value);
    toast.success('Copied');
  };
  return (
    <Container>
      <LabelContainer>
        <Label>{label}</Label>
        <RightLabelContainer>
          <ButtonCopy onClick={() => handleCopy(value)}>
            <MdContentCopy size={20} color="#FFFFFF" />
          </ButtonCopy>
          <ButtonQrCode onClick={handleClickQrCode}>
            <MdQrCode size={20} color="#FFFFFF" />
          </ButtonQrCode>
        </RightLabelContainer>
      </LabelContainer>
      <Value>{value}</Value>
    </Container>
  );
};

export default CopyItem;
