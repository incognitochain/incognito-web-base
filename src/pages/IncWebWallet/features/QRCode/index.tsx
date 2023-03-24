// export { default as FormSend } from './FormSend';
// export { default as enhance } from './FormSend.enhance';
// export { default as reducer } from './FormSend.reducer';
import { useModal } from 'components/Modal';
import styled from 'styled-components/macro';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import QrCodeModal from '../../components/QrCodeModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
  min-height: 670px;

  .content-wrapper {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .close-icon {
    z-index: 2;
    margin-left: auto;
    font-size: 14px;
  }
  .header {
    margin-top: 0;
  }
  .modal-data {
    flex: 1;
  }
  .wrap-content {
    padding-top: 24px;
  }
  .label {
    margin-bottom: 30px;
    text-align: center;
  }
`;

interface Props {
  title?: string;
  label?: string;
  value?: string;
}

const QRCodePage = (props: Props) => {
  const { title = '', label = '', value = '' } = props;
  const { closeModal } = useModal();

  return (
    <Container className="animation-opacity">
      <NavigationHeader
        leftTitle={`${title || ''}`}
        onBack={() => {
          closeModal();
        }}
      />
      <div className="modal-data">
        <QrCodeModal label={label} value={value} key="AddressBar" />
      </div>
    </Container>
  );
};

export default QRCodePage;
