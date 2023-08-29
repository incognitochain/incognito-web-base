import { Tooltip } from 'antd';
import placeHolderImg from 'assets/images/image_default.png';
import { useModal } from 'components/Modal';
import { INSCRIPTION_BASE_URL } from 'pages/IncWebWallet/services/http2';
import React, { useState } from 'react';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Eye, EyeOff, Flag, Info } from 'react-feather';
import { Inscription } from 'state/inscriptions';

import ReportInscriptionModal from './ReportInscriptionModal';
import { Container, SpinStyled } from './styled';

type Props = {
  inscription: Inscription;
  onClick?: () => void;
  disbledBlur?: boolean;
  isInscriptipDetail?: boolean;
};

const InscriptionLoader = React.memo((props: Props) => {
  const { inscription, onClick, disbledBlur, isInscriptipDetail = false } = props;
  const { content_type, index, token_id, hide } = inscription;
  const { setModal } = useModal();
  const [isBlur, setBlur] = useState(hide);
  const [isToolTipOpen, setToolTipOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!inscription) return null;

  const onLoad = (e: any) => {
    setLoading(false);
  };

  const onError = (e: any) => {
    setLoading(false);
    e.target.onerror = null;
    // e.target.src = imgLogo;
    setError(true);
  };

  const renderInscriptionContent = () => {
    const { content_type } = inscription;

    const srcUrl = `${INSCRIPTION_BASE_URL}/inscription-content?id=${token_id}`;
    if (error)
      return (
        <div className="placeholder-image-container">
          <img className="placeholder-image" src={placeHolderImg} alt="errorImg" />
        </div>
      );

    switch (content_type) {
      case 'image/jpeg':
      case 'image/png':
        return (
          <img src={srcUrl} className="image" alt={`${token_id}-imageTag`} onLoad={onLoad} onError={onError}></img>
        );
      case 'application/pdf':
        return (
          <iframe
            src={srcUrl + '#toolbar=0'}
            frameBorder="0"
            scrolling="no"
            className="iframe"
            sandbox={'allow-scripts allow-pointer-lock'}
            title={`${token_id}-iframeTag`}
            onLoad={onLoad}
            onError={onError}
          ></iframe>
        );
      default:
        return (
          <iframe
            src={srcUrl}
            scrolling="no"
            sandbox={'allow-scripts allow-pointer-lock'}
            className="iframe"
            title={`${token_id}-iframeTag`}
            onLoad={onLoad}
            onError={onError}
          ></iframe>
        );
    }
  };

  const renderLoading = () => <SpinStyled size="large" />;
  const renderContent = () => {
    const className = disbledBlur ? '' : isBlur ? 'blurContent' : '';
    return <div className={`card-image ${className}`}>{renderInscriptionContent()}</div>;
  };

  const reportOnClick = () => {
    setToolTipOpen(false);
    setModal({
      closable: true,
      data: <ReportInscriptionModal inscription={inscription} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Report Inscription',
      isSearchTokenModal: false,
    });
  };

  const viewContentOnClick = () => {
    setBlur(!isBlur);
  };

  const renderInfoContent = () => (
    <div className="tool-tip-content">
      <div className="row-tool-tip" onClick={reportOnClick}>
        <Flag size={18} color="white"></Flag>
        <p>Report Image</p>
      </div>
      {hide && (
        <div className="row-tool-tip" onClick={viewContentOnClick}>
          <Eye size={18} color="white"></Eye>
          <p>{`${isBlur ? 'View Post' : 'Hide Post'}`}</p>
        </div>
      )}
    </div>
  );

  const cardOnClick = () => {
    if (isToolTipOpen || isBlur) return;
    onClick && onClick();
  };

  const renderOverlay = () => {
    return (
      <div className="overlay" onClick={cardOnClick}>
        {!disbledBlur && (
          <>
            <div className="infoAreaView">
              <div className="infoBlurBackground"></div>
              <Tooltip
                placement="top"
                open={isToolTipOpen}
                overlay={renderInfoContent}
                onOpenChange={(flag: boolean) => {
                  setToolTipOpen(flag);
                }}
              >
                <Info className="infoIcon" size={30} color="white" />
              </Tooltip>
            </div>
            {isBlur && <EyeOff color="black" style={{ margin: 'auto' }} size={30} />}
          </>
        )}
      </div>
    );
  };

  const className = isInscriptipDetail ? 'hover-deactive' : 'hover-active';
  return (
    <Container className={className}>
      {renderContent()}
      {loading && renderLoading()}
      {renderOverlay()}
    </Container>
  );
});

InscriptionLoader.displayName = 'InscriptionLoader ';

export { InscriptionLoader };
