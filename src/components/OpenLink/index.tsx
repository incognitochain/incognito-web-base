import React from 'react';
import styled from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const OpenLinkVector = React.memo((props: any) => {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" {...props}>
      <path
        d="M4.425 2.984a1.422 1.422 0 1 0 0 2.844h11.151a.237.237 0 0 1 .234.282.247.247 0 0 1-.063.126L3.42 18.563a1.425 1.425 0 0 0 2.01 2.02L17.757 8.256a.228.228 0 0 1 .256 0 .237.237 0 0 1 .142.218v11.104a1.422 1.422 0 1 0 2.845 0V5.354a2.37 2.37 0 0 0-.702-1.688 2.399 2.399 0 0 0-1.65-.682H4.425Z"
        fill="#fff"
      />
    </svg>
  );
});

OpenLinkVector.displayName = 'OpenLinkVector';

const OpenLink = (props: any & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Styled className="icon" {...props}>
      <OpenLinkVector />
    </Styled>
  );
};

OpenLink.displayName = 'OpenLink';

export default OpenLink;
