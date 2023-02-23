import BlinkPasswordIcon from 'assets/svg/blink-password-ic.svg';
import ShowPasswordIcon from 'assets/svg/show-password-ic.svg';
import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.color_grey2};
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.white};

  :focus {
    border: 2px solid ${({ theme }) => theme.color_blue};
  }
  :hover {
    outline: none !important;
    border: 2px solid ${({ theme }) => theme.color_blue};
  }

  .input-container-style {
    flex: 1;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
  }

  .icon-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

interface InputProps {
  value: string;
  type: 'text' | 'password';
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  refInput?: any;
  className?: string | undefined;
}

const Input = (props: InputProps) => {
  const {
    type = 'text',
    value = '',
    placeholder = '',
    onChange = () => {},
    onKeyDown = () => {},
    refInput,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cuurentType, setCuurentType] = useState<HTMLInputTypeAttribute | undefined>(type);
  const inputTypeInit = useRef<string>(type);

  useEffect(() => {
    inputTypeInit.current = type;
  }, []);

  const onClick = () => {
    setShowPassword(!showPassword);
    setCuurentType(cuurentType === 'text' ? 'password' : 'text');
  };

  return (
    <InputWrapper>
      <input
        ref={refInput}
        className={`input-container-style ${className}`}
        type={cuurentType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {inputTypeInit.current === 'password' && (
        <div className="icon-container" onClick={onClick}>
          {showPassword ? (
            <img alt="BlinkPasswordIcon" src={BlinkPasswordIcon} />
          ) : (
            <img alt="ShowPasswordIcon" src={ShowPasswordIcon} />
          )}
        </div>
      )}
    </InputWrapper>
  );
};

export default Input;
