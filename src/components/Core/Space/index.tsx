import styled from 'styled-components/macro';

const ElementHTMLDiv = styled.div`
  display: flex;
  background-color: 'transparent';
`;
interface SizeProps {
  size?: number;
}

interface Props extends SizeProps {}

interface SpaceProps extends Props, React.ButtonHTMLAttributes<HTMLDivElement> {}

const StyledSpace = styled(ElementHTMLDiv)<SpaceProps>`
  height: ${({ size, theme }) => `${size || 0}px`};
  width: ${({ size, theme }) => `${size || 0}px`};
`;

const Vertical = styled(ElementHTMLDiv)<SpaceProps>`
  height: ${({ size, theme }) => `${size || 0}px`};
`;

const Horizontal = styled(ElementHTMLDiv)<SpaceProps>`
  width: ${({ size, theme }) => `${size || 0}px`};
`;

const Space = (props: SizeProps) => <StyledSpace {...props} />;

Space.Vertical = Vertical;
Space.Horizontal = Horizontal;

export default Space;
