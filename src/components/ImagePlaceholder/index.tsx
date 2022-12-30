/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import openseaImg from 'assets/images/opensea-icon.png';
import Placeholder from 'assets/images/placeholder.png';
import React, { memo } from 'react';
import styled from 'styled-components/macro';

export const Styled = styled.div`
  display: flex;
  .link-opensea {
    display: flex;
    position: absolute;
    width: 40px;
    height: 40px;
    margin-top: 16px;
    margin-left: 16px;
    cursor: pointer;
  }
`;

function ImagePlacholder({
  animationUrl,
  src,
  className,
  rootClassName,
  linkOpensea,
}: {
  animationUrl?: string;
  src?: string;
  className: any;
  rootClassName?: any;
  linkOpensea?: string;
}) {
  return (
    <Styled className={rootClassName}>
      {animationUrl ? (
        <iframe title="" src={animationUrl || Placeholder} allowFullScreen className={className} />
      ) : (
        <img src={src || Placeholder} className={className} alt="" loading="lazy" />
      )}
      {linkOpensea && <img className="link-opensea" src={openseaImg} onClick={() => window.open(linkOpensea)} />}
    </Styled>
  );
}

export default memo(ImagePlacholder);
