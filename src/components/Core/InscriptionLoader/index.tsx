import placeHolderImg from 'assets/images/image_default.png';
import { INSCRIPTION_SERVICE_URL } from 'pages/IncWebWallet/services/http2';
import React, { useState } from 'react';
import { Inscription } from 'state/inscriptions';

import { Container, SpinStyled } from './styled';

type Props = {
  inscription: Inscription;
  onClick?: () => void;
};

const InscriptionLoader = React.memo((props: Props) => {
  const { inscription, onClick } = props;

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

    const srcUrl = `${INSCRIPTION_SERVICE_URL}/inscription-content?id=${token_id}`;

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
            title={`${token_id}-iframeTag`}
            onLoad={onLoad}
            onError={onError}
          ></iframe>
        );
      default:
        return (
          <iframe
            src={srcUrl}
            sandbox={'allow-pointer-lock'}
            scrolling="no"
            className="iframe"
            title={`${token_id}-iframeTag`}
            onLoad={onLoad}
            onError={onError}
          ></iframe>
        );
    }
  };

  const { content_type, index, token_id } = inscription;

  const renderLoading = () => <SpinStyled size="large" />;
  const renderContent = () => {
    return (
      <div className="card-image" onClick={onClick}>
        {renderInscriptionContent()}
      </div>
    );
  };
  const renderOverlay = () => {
    return <div className="overlay" onClick={onClick}></div>;
  };

  return (
    <Container>
      {renderContent()}
      {loading && renderLoading()}
      {renderOverlay()}
    </Container>
  );
});

InscriptionLoader.displayName = 'InscriptionLoader';

export { InscriptionLoader };
