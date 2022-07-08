import imgLogo from 'assets/images/inc_logo.png';
import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
  size?: string;
}

const Styled = styled.img`
  width: 24px;
  height: 24px;
`;

const Image = React.memo((props: IProps) => {
  const { iconUrl } = props;

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  return <Styled className="logo noselect" src={iconUrl} alt="logo-icon" onError={onError} />;
});

Image.displayName = 'Image';

export { Image };
