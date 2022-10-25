import React from 'react';
import QRCodeReact from 'react-qr-code';
import styled from 'styled-components/macro';

import Loader from '../Core/Loader';

interface IProps {
  hook?: any;
  qrCodeProps: any;
  label?: string;
  copyProps?: any;
  isBlur?: boolean;
  isLoading?: boolean;
}

const Styled = styled.div`
  position: relative;
  .label {
    text-align: center;
    margin-left: 54px;
    margin-right: 54px;
  }
  .qrcode-react {
    justify-content: center;
    display: flex;
    width: fit-content;
    padding: 8px;
    margin: auto;
    background-color: ${({ theme }) => theme.primary5};
    border-radius: 8px;
  }
  .blur {
    -webkit-filter: blur(8px);
    filter: blur(8px);
  }
  .loader {
    position: absolute;
    top: 40%;
    left: 48% !important;
  }
`;

const QrCode = (props: IProps) => {
  const { qrCodeProps, label, isBlur, isLoading } = props;
  return (
    <Styled>
      <div className="label">{label}</div>
      <div className={`qrcode-react ${isBlur ? 'blur' : ''}`}>
        <QRCodeReact {...{ ...qrCodeProps, size: qrCodeProps?.size || 184 }} bgColor="transparent" />
      </div>
      {!!isLoading && <Loader />}
    </Styled>
  );
};

export default QrCode;
