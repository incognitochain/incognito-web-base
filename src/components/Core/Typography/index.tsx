import { TextProps as TextPropsOriginal } from 'rebass';

import Text from './Text';

export declare type TypographyProps = TextPropsOriginal & {
  Text?: typeof Text;
  // Link: typeof Link;
  // Header: typeof Header;
  // Paragraph: typeof Paragraph;
};
const Typography = (props: TypographyProps) => <>{props.children}</>;
Typography.Text = Text;
// Typography.Link = Link;
// Typography.Header = Header;
// Typography.Paragraph = Paragraph;

export default Typography;
