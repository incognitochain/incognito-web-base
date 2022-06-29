import Logo from 'components/Core/Logo';
import useHttpLocations from 'hooks/useHttpLocations';
import React from 'react';
import styled from 'styled-components/macro';

const StyledListLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export default function ListLogo({
  logoURI,
  style,
  size = '24px',
  alt,
}: {
  logoURI: string;
  size?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  const srcs: string[] = useHttpLocations(logoURI);

  return <StyledListLogo alt={alt} size={size} srcs={srcs} style={style} />;
}