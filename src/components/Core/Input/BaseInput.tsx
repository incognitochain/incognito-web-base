import styled from 'styled-components/macro';

/* 
/ -----------------------------------------------------------------------
/ RawInput from HTML tag
/ -----------------------------------------------------------------------
*/

export const RawInput = styled.input``;

/* 
/ -----------------------------------------------------------------------
/ BaseInput based on project detail, Inherit from  RawInput
/ -----------------------------------------------------------------------
*/

const BaseInput = styled(RawInput)`
  flex: 1 1 auto;
  outline: none;
  border: none;

  margin: 0px;
  padding: 12px 14px;

  border: 1px solid 'transparent';
  border-radius: 12px;

  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray_252525};

  input::placeholder {
    color: ${({ theme }) => theme.colors.gray_757575};
    font-size: 14px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray_757575};
    font-size: 14px;
  }

  :hover {
    padding: 11px 13px;
    border: 1px solid ${({ theme }) => theme.colors.blue_1A73E8};
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -webkit-appearance: textfield;
`;

export default BaseInput;
