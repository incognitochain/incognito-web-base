// import { Container, Content } from './SelectionSendField.styled';
import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  outline: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  color: ${({ theme }) => theme.primary5};
  border-radius: 8px;
  :hover {
  }

  ::placeholder {
    color: ${({ theme }) => theme.primary7};
  }
  padding: 0;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const BodyContainer = styled.div`
  border-radius: 12px;
  padding: 12px 14px;

  border: 1px solid 'transparent';

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.gray_252525};

  :hover {
    padding: 11px 13px;
    border: 1px solid ${({ theme }) => theme.colors.blue_1A73E8};
  }
`;

export const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const RigtViewWrapper = styled.div`
  padding: 15px;
`;
