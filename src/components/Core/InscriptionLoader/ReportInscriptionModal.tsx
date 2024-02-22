import { useModal } from 'components/Modal';
import Loading from 'components/Modal/Modal.loading';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reportInscriptionById } from 'state/inscriptions';
import styled from 'styled-components/macro';
import { parseError } from 'utils/errorHelper';

const Row = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
  min-height: 150px;
  padding: 20px;

  .desc {
    margin: 20px 0;
    align-self: left;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.15rem;
    width: max-content;
    white-space: nowrap;
  }

  .cancelButton {
    padding: 6px 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 1px solid grey;
    border-radius: 8px;
    align-self: center;
  }

  .okButton {
    padding: 6px 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    align-self: center;
  }

  button {
    padding: 6px 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    align-self: center;

    :hover {
      cursor: pointer;
      opacity: 0.8;
      scale: 1.02;
    }

    .okText {
      align-self: center;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      width: max-content;
      color: ${({ theme }) => theme.primary5};
    }
    .cancelText {
      align-self: center;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      width: max-content;
      white-space: nowrap;
      color: ${({ theme }) => theme.primary5};
    }
  }
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  inscription: any;
}

const ReportInscriptionModal = (props: Props) => {
  const { inscription } = props;
  const { setModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const onCancel = () => {
    closeModal();
  };
  const onReport = async () => {
    if (!inscription || !inscription.token_id) return;
    let reportSucess;
    try {
      setModal({
        closable: false,
        data: <Loading />,
        isTransparent: false,
        rightHeader: undefined,
        title: '',
        hideHeaderDefault: true,
      });
      await dispatch(reportInscriptionById(inscription.token_id));
      toast.success('Report successfully.', { autoClose: 1000 });
      reportSucess = true;
    } catch (error) {
      console.log('[ReportInscription] error ', error);
      toast.error(parseError(error));
      reportSucess = false;
    } finally {
      closeModal();
      if (reportSucess) {
        closeModal();
      }
    }
  };

  return (
    <Container className="animation-opacity">
      <p className="desc">{'Are you sure to report to this inscription?'}</p>
      <Row>
        <button className="cancelButton" onClick={onCancel}>
          <p className="cancelText">Cancel</p>
        </button>
        <button onClick={onReport}>
          <p className="okText">OK</p>
        </button>
      </Row>
    </Container>
  );
};

export default ReportInscriptionModal;
