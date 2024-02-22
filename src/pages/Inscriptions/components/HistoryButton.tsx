import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Book } from 'react-feather';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  gap: 0.3rem;
  /* background-color: ${({ theme }) => theme.primary2}; */
  border-radius: 8px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.1;
  }

  .button-tooltip {
  }
`;

type Props = {
  onClickCallBack?: any;
};

const HistoryButton = (props: Props) => {
  const { onClickCallBack } = props;
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="button-tooltip">
      <p
        style={{
          fontSize: 16,
        }}
      >
        History
      </p>
    </Tooltip>
  );

  return (
    <Container onClick={() => onClickCallBack && onClickCallBack()}>
      <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 200 }} overlay={renderTooltip}>
        <Book color="white" size={30} />
      </OverlayTrigger>
    </Container>
  );
};

export default React.memo(HistoryButton);
