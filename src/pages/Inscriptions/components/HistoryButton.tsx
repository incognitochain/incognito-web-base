import React from 'react';
import { Book } from 'react-feather';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
  gap: 0.3rem;
  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.02;
  }

  .text {
    align-self: center;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.2rem;
    white-space: nowrap;
    color: ${({ theme }) => theme.primary5};
  }
`;

type Props = {
  onClickCallBack?: any;
};

const HistoryButton = (props: Props) => {
  const { onClickCallBack } = props;

  return (
    <Container onClick={() => onClickCallBack && onClickCallBack()}>
      <p className="text">History</p>
      <Book color="white" size={25} />
    </Container>
  );
};

export default React.memo(HistoryButton);
