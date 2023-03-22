import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div<{ marginTop: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header-title {
    margin-bottom: 8px;
  }
  margin-top: ${({ marginTop }: { marginTop: number }) => marginTop}px;
`;

const TextInputStyled = styled.input`
  padding-left: 16px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  min-height: 48px;
  background: #404040;
  border-radius: 8px;
  border-width: 1px;
  color: ${({ theme }) => theme.color_white};
  :focus {
    border: 2px solid ${({ theme }) => theme.color_blue};
  }
  :hover {
    outline: none !important;
    border: 2px solid ${({ theme }) => theme.color_blue};
  }
  ::placeholder {
    color: ${({ theme }) => theme.color_grey};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
const ErrorText = styled.p`
  width: 100%;
  color: red;
  text-align: left;
`;

interface TextInputProps {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  errorEnable?: boolean;
  errorText?: string;
  multiple?: boolean;
  header?: string;
  disabled?: boolean;
  marginTop?: number;
  refInput?: any;
  type?: any;
}

const MasterKeyNameInput = (props: TextInputProps) => {
  const {
    value = '',
    header,
    errorEnable = false,
    errorText = '',
    placeholder = '',
    multiple = false,
    disabled = false,
    marginTop = 0,
    onChange = () => {},
    onKeyDown = () => {},
    onBlur = () => {},
    refInput,
    type = 'text',
  } = props;

  return (
    <Container className="input-container" marginTop={marginTop}>
      {!!header && <p className="header-title">{header}</p>}
      <TextInputStyled
        placeholder={placeholder}
        type={type}
        className="full-width"
        onChange={onChange}
        value={value}
        disabled={disabled}
        multiple={multiple}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={refInput}
      />
      {errorEnable && <ErrorText className="fs-small fw-regular">{errorText}</ErrorText>}
    </Container>
  );
};

export default MasterKeyNameInput;
