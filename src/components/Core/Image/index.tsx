import imgLogo from 'assets/images/inc_logo.png';
import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
  size?: number;
}

const Styled = styled.img``;

const Image = React.memo((props: IProps) => {
  const { iconUrl, size = 24 } = props;

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  return (
    <Styled
      className="logo noselect"
      src={iconUrl}
      alt="logo-icon"
      style={{ width: size, height: size }}
      onError={onError}
    />
  );
});

Image.displayName = 'Image';

export { Image };
