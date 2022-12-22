import * as React from 'react';
import styled from 'styled-components/macro';
const LinkSVG = (props: any) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19.699 4.283 3.998 20M4 4h15a1 1 0 0 1 1 1v15"
      stroke="#9C9C9C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Styled = styled(LinkSVG)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const LinkIcon = (props: any) => <Styled {...props} />;

export default LinkIcon;
