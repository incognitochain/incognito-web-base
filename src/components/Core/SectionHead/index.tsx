import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  width: fit-content;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 8px;
  margin-bottom: 24px;

  .label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium``}
`;

const SectionHead = React.memo(({ title, className }: { title: string; className?: string }) => {
  return (
    <Styled className={`background2 ${className}`}>
      <p className="label">{title}</p>
    </Styled>
  );
});

export default SectionHead;
