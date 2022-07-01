import React from 'react';
import { ButtonProps as ButtonPropsOriginal } from 'rebass';
import styled from 'styled-components/macro';

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>;

export const ButtonMaxStyled = styled.button<
  {
    padding?: string;
    width?: string;
    $borderRadius?: string;
    altDisabledStyle?: boolean;
  } & ButtonProps
>`
  padding: 2px 8px 2px 8px;
  text-align: center;
  border-radius: 8px;
  outline: none;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.primary5};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.bg3};
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }
`;

export const ButtonMax = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { ...rest } = props;
  return (
    <ButtonMaxStyled type="button" className="border-hover" {...rest}>
      Max
    </ButtonMaxStyled>
  );
};
