/* eslint-disable jsx-a11y/iframe-has-title */
import Placeholder from 'assets/images/placeholder.png';
import React, { memo } from 'react';
import styled from 'styled-components/macro';

export const Iframe = styled.iframe`
  /* pointer-events: none; */
`;

function ImagePlacholder({ animationUrl, src, className }: { animationUrl?: string; src?: string; className: any }) {
  if (animationUrl) {
    return <Iframe title="" src={animationUrl || Placeholder} allowFullScreen className={className} />;
  }
  return <img src={src || Placeholder} className={className} alt="" loading="lazy" />;
}

export default memo(ImagePlacholder);
