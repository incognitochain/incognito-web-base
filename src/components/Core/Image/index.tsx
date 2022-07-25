import imgLogo from 'assets/images/inc-circle-logo.png';
import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
  size?: number;
  border?: boolean;
}

const Styled = styled.img<{ border?: boolean }>`
  border-radius: ${({ border }) => (border ? '50%' : 'none')};
`;

const Image = React.memo((props: IProps) => {
  const { iconUrl, size = 24, border = true } = props;

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  return (
    <Styled
      className="logo noselect"
      src={iconUrl}
      alt="logo-icon"
      border={border}
      style={{ width: size, height: size }}
      onError={onError}
      {...props}
    />
  );
});

Image.displayName = 'Image';

export { Image };
