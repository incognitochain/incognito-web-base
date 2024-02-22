import { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { getLoading, getMessage } from 'state/loading/loading.selectors';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  padding: 5px;
  color: #1c1c1c;
`;

const AppSpinner = () => {
  const show: boolean = useSelector(getLoading) || false;
  const message = useSelector(getMessage) || 'Please wait a moment..';
  return (
    <Modal show={show} size="sm" centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <Container>
          <Spinner animation="border" role="status"></Spinner>
          <Description>{message}</Description>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default memo(AppSpinner);
