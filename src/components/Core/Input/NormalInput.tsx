import { Space, Typography } from 'components/Core';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

import BaseInput from './BaseInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

/* 
/ -----------------------------------------------------------------------
/ Detail Input for case by case using, Inherit from BaseInput and 
/ include all css defined before
/ -----------------------------------------------------------------------
*/

const NormalInputStyled = styled(BaseInput)``;

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
};

const NormalInput = (props: Props) => {
  const { title, ...nest } = props;
  return (
    <Container>
      {title && (
        <>
          <Typography.Text type="p2" color="gray_9C9C9C" textAlign={'left'}>
            {title}
          </Typography.Text>
          <Space.Vertical size={10} />
        </>
      )}
      <NormalInputStyled type={'text'} {...nest} />
    </Container>
  );
};

export default NormalInput;
