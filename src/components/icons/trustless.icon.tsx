import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const CustomSVG = styled.svg`
  width: 72px;
  height: 72px;
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      width: 56px;
      height: 56px;
  `}
`;

const TrustlessIcon = () => (
  <CustomSVG viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx={36} cy={36} r={36} fill="#1A1A1A" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M52 36C52 44.8366 44.8366 52 36 52C27.1634 52 20 44.8366 20 36C20 27.1634 27.1634 20 36 20C44.8366 20 52 27.1634 52 36ZM34.947 26.6324C35.4558 25.8959 36.5443 25.8959 37.0532 26.6324L41.3994 32.9231C41.7825 33.4774 41.6701 34.2338 41.1425 34.6529L36.7411 38.1491C36.2711 38.5225 35.6048 38.5191 35.1386 38.141L30.8405 34.6548C30.3211 34.2335 30.2136 33.4833 30.5938 32.9331L34.947 26.6324ZM41.5475 41.7647C42.0868 41.3077 42.1535 40.5 41.6964 39.9606C41.2394 39.4213 40.4317 39.3546 39.8924 39.8117L36.0071 43.1043L32.1957 39.8187C31.6603 39.3571 30.852 39.417 30.3905 39.9524C29.9289 40.4879 29.9887 41.2961 30.5242 41.7577L35.1642 45.7577C35.6413 46.169 36.3469 46.172 36.8275 45.7647L41.5475 41.7647Z"
      fill="white"
    />
  </CustomSVG>
);

export default TrustlessIcon;
