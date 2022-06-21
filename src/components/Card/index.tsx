import { ITheme } from 'styled-components';
import styled from 'styled-components/macro';

const Card = styled.div<{
  width?: string;
  padding?: string;
  border?: string;
  $borderRadius?: string;
}>`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? '1rem'};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '16px'};
  border: ${({ border }) => border};
`;

const LightCard = styled(Card)`
  background-color: ${({ theme }: { theme: ITheme }) => theme.white};
`;

export { Card, LightCard };
