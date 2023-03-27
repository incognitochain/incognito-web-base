import { ReactNode } from 'react';
import styled from 'styled-components/macro';

export const PaddingDefault = styled.div`
  padding: 18px 16px;

  :hover {
    padding: 17px 15px;
  }
`;

export const PaddingZero = styled.div`
  padding: 0px;
`;

export const PaddingWrapper = styled.div<PaddingExternalProps>`
  padding-top: ${({ top }) => `${top || 0}px`};
  padding-left: ${({ left }) => `${left || 0}px`};
  padding-bottom: ${({ bottom }) => `${bottom || 0}px`};
  padding-right: ${({ right }) => `${right || 0}px`};

  :hover {
    padding-top: ${({ top }) => `${(top ? top - 1 : 0) || 0}px`};
    padding-left: ${({ left }) => `${(left ? left - 1 : 0) || 0}px`};
    padding-bottom: ${({ bottom }) => `${(bottom ? bottom - 1 : 0) || 0}px`};
    padding-right: ${({ right }) => `${(right ? right - 1 : 0) || 0}px`};
  }
`;

export interface PaddingExternalProps {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export const PaddingSize = (props: PaddingExternalProps) => {
  const { top = 0, left = 0, bottom = 0, right = 0 } = props;
  const newProps = {
    top,
    left,
    bottom,
    right,
  };
  return <PaddingWrapper {...newProps} />;
};

type PaddingProps = {
  children?: ReactNode | undefined;
  Default?: typeof PaddingDefault;
  Zero?: typeof PaddingZero;
  Size?: typeof PaddingSize;
};

const Padding = (props: PaddingProps) => <>{props.children}</>;

Padding.Default = PaddingDefault;
Padding.Zero = PaddingZero;
Padding.Size = PaddingSize;

export default Padding;
