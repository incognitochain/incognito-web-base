import { Box, BoxProps as RebassBoxProps } from 'rebass';
import styled from 'styled-components/macro';
import { ColorsKey } from 'theme/colors';

declare const ContainerTypes: ['default', 'primary', 'secondary'];
export declare type ContainerType = typeof ContainerTypes[number];

type ContainerProps = Omit<RebassBoxProps, 'css' | 'type' | 'color'>;
type ContainerWrapperType = { colorOverride: ColorsKey } & ContainerExternalProps;

const ContainerWrapper = styled(Box)<ContainerWrapperType>`
  /* Default CSS */
  display: flex;

  border-radius: 12px;
  padding: 18px 16px;

  border: 1px solid 'transparent';

  flex-direction: column;

  /* Override CSS */

  background-color: ${({ colorOverride, theme }) => theme.colors[colorOverride]};

  :hover {
    cursor: pointer;
    padding: 17px 15px;
    border: 1px solid ${({ theme }) => theme.colors.blue_1A73E8};
  }
`;

interface ContainerExternalProps extends ContainerProps {
  type?: ContainerType;
  color?: ColorsKey;
  hover?: boolean;
}

const Container = (props: ContainerExternalProps) => {
  const { type = 'default', color = 'gray_252525', hover = 'false' } = props;
  const newProps = {
    ...props,
    colorOverride: color,
    hover,
    type,
  };
  return <ContainerWrapper {...newProps} />;
};

export default Container;
