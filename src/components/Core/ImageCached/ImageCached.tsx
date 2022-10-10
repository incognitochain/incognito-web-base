import logoStrokeImg from 'assets/images/logo-stroke.png';
import React from 'react';
import { Image } from 'rebass';

const ImageCached = React.memo(({ src, className }: { src: string; className: string }) => {
  const [isError, setIsError] = React.useState(false);
  if (isError) {
    return <Image src={logoStrokeImg} className={`${className}`} alt="icon-logo" />;
  }
  return <Image src={src} className={`${className}`} alt="icon-logo" onError={() => setIsError(true)} />;
});

export default ImageCached;
