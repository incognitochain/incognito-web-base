import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components/macro';

interface IProps {
  onBack: () => void;
}

const Styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #303030;
  border-radius: 16px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

// eslint-disable-next-line react/display-name
const BackButton = (props: IProps) => {
  return (
    <Styled onClick={() => props?.onBack?.()}>
      <MdArrowBack size={24} color="white" />
    </Styled>
  );
};

export default BackButton;
