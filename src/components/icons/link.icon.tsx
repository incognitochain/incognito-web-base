import * as React from 'react';
import styled from 'styled-components/macro';
const LinkSVG = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 3 3 21M3 3h16.875A1.125 1.125 0 0 1 21 4.125V21"
      stroke="#9C9C9C"
      strokeWidth="2"
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
