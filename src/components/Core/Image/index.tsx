import React, { ImgHTMLAttributes } from 'react';

import imgLogo from '../../../assets/images/inc_logo.png';

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
}

const Image = React.memo((props: IProps) => {
  const { iconUrl } = props;

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  return <img className="logo noselect" src={iconUrl} alt="logo-icon" onError={onError} />;
});

Image.displayName = 'Image';

export { Image };
