import React from 'react';
import styled from 'styled-components/macro';
import { Z_INDEX } from 'theme';

export const BodyWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: ${({ maxWidth }) => maxWidth ?? '434px'};
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  border-radius: 18px;
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.deprecated_content};
  padding: 24px;
  min-height: 200px;
  .loader {
    left: 50%;
  }
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & any) {
  return (
    <BodyWrapper className={`${className ? className : ''}`} {...rest}>
      {children}
    </BodyWrapper>
  );
}
