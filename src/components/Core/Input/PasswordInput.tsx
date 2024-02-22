import { Space, Typography } from 'components/Core';
import { EyeClose, EyeOpen } from 'components/SVG';
import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components/macro';

import BaseInput from './BaseInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 15px;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

/* 
/ -----------------------------------------------------------------------
/ Detail Input for case by case using, Inherit from BaseInput and 
/ include all css defined before
/ -----------------------------------------------------------------------
*/

const PasswordInputStyled = styled(BaseInput)``;

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  onClickCallBack?: () => void;
  title?: string;
};

const PasswordInput = (props: Props) => {
  const { title, onClickCallBack, ...nest } = props;
  const [isSecurity, setSecurity] = useState(true);

  const iconOnClick = () => {
    setSecurity(!isSecurity);
    onClickCallBack && onClickCallBack();
  };

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
      <InputWrapper>
        <PasswordInputStyled type={isSecurity ? 'password' : 'text'} style={{ paddingRight: 60 }} {...nest} />
        <IconWrapper onClick={iconOnClick}>{isSecurity ? <EyeClose /> : <EyeOpen />}</IconWrapper>
      </InputWrapper>
    </Container>
  );
};

export default PasswordInput;
