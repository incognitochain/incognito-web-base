import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

interface IProps {
  onBack?: () => void;
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
export const BackButton: React.FC<IProps> = (props: IProps) => {
  const history = useHistory();
  return (
    <Styled
      onClick={() => {
        if (typeof props?.onBack === 'function') {
          props?.onBack?.();
        } else {
          history.goBack();
        }
      }}
    >
      <MdArrowBack size={24} color="white" />
    </Styled>
  );
};

export default BackButton;
